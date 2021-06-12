import yargs from "yargs"
import axios from "axios"
import cheerio from "cheerio"
import { MongoClient, ObjectID } from "mongodb"
import { FictionEntry, FictionEntryDatabase } from "./FictionEntry"
import renderFictionEntry from "./renderFictionEntry"
import chalk from "chalk"

const url = "mongodb://192.168.1.85:49153"
const dbName = "ffdb"
const colName = "fics"

const client = new MongoClient(url, { useUnifiedTopology: true })

async function initMongo(cli: MongoClient) {
    let db = cli.db(dbName)

    if ((await db.listCollections({ name: colName }).toArray()).length == 0) {
        db.createCollection(colName)
    }
}

function processAO3Url(url: string): string {
    let split = url.split("/")

    return split.length > 5 ? split.slice(0, 5).join("/") : url
}

async function scrapeAO3(url: string): Promise<FictionEntry> {
    const $ = cheerio.load((await axios.get(url)).data)

    const title = $("#workskin .preface h2.heading").text().replace(/\n\s+/g, "")
    const author = $("#workskin .preface h3.heading a").text()

    const rating = $(".work .wrapper dl dd.rating.tags ul li a").text()
    const warnings = $(".work .wrapper dl dd.warning.tags ul li a").toArray().map(e => $(e).text()).filter(e => e != "Creator Chose Not To Use Archive Warnings" && e != "No Archive Warnings Apply")
    const fandom = $(".work .wrapper dl dd.fandom.tags ul li a").text()
    const relationships = $(".work .wrapper dl dd.relationship.tags ul li a").toArray().map(e => $(e).text().split("/"))
    const characters = $(".work .wrapper dl dd.character.tags ul li a").toArray().map(e => $(e).text().replace(/\s\((\w+\s?)+\)/g, ""))
    const tags = $(".work .wrapper dl dd.freeform.tags ul li a").toArray().map(e => $(e).text())

    const published = new Date($(".work .wrapper dl dd.stats dl dd.published").text())
    const updated = new Date($(".work .wrapper dl dd.stats dl dd.status").text())
    const complete = $(".work .wrapper dl dd.stats dl dt.status").text() == "Completed:"
    const wordcount = parseInt($(".work .wrapper dl dd.stats dl dd.words").text())
    
    const chapters = parseInt($(".work .wrapper dl dd.stats dl dd.chapters").text().split("/")[0])
    const comments = parseInt($(".work .wrapper dl dd.stats dl dd.comments").text())
    const kudos = parseInt($(".work .wrapper dl dd.stats dl dd.kudos").text())
    const bookmarks = parseInt($(".work .wrapper dl dd.stats dl dd.bookmarks").text())
    const hits = parseInt($(".work .wrapper dl dd.stats dl dd.hits").text())

    return {
        title,
        author,
        fandom,
        rating,
        characters,
        relationships,
        tags: warnings.concat(tags),
        wordcount,
        published,
        updated,
        complete,
        sources: [ processAO3Url(url) ]
    }
}

//scrapeAO3("https://archiveofourown.org/works/14281440").then(fic => console.log(renderFictionEntry(fic)))

yargs
    .scriptName('ff-cli')
    .usage('$0 <cmd> [args]')
    .command({
        command: "*",
        handler: (args) => {
            console.log(chalk`{dim The available commands are:} {whiteBright list, add, rm}\n{dim Don't bother using --help without a command, yargs is busted or something so it doesn't work. It seems fine when you use a command though, so things like} {whiteBright ff-cli list --help} {dim work just fine.}`)
        }
    })
    .command({
        command: "list [page]",
        builder: {
            page: {
                type: "number",
                default: 1
            },
            noPage: {
                alias: [ "noPages", "noPagination" ],
                type: "boolean",
                default: false
            },
            pageSize: {
                type: "number",
                default: 20
            }
        },
        handler: async (args: { noPage: boolean, page: number, pageSize: number }) => {
            const cli = await client.connect()
            initMongo(cli)
            const db = cli.db(dbName).collection(colName)
            
            let res: FictionEntryDatabase[];

            if (args.noPage) {
                console.log(chalk`{yellow WARNING:} Pagination has been {bgRed DISABLED}. This may cause performance issues with large databases.`)
                res = await db.find({}).toArray()
            } else {
                res = await db.find({}).skip(args.page > 0 ? (args.page - 1) * args.pageSize : 0).limit(args.pageSize).toArray()
            }

            if (res.length === 0) {
                console.log(chalk`{dim The fic database seems to be empty. You can fix that using the} {whiteBright ${(yargs.argv as any).$0} add <url>} {dim command.}`)
            }

            console.log(res.map(fic => renderFictionEntry(fic)).join("\n"))

            client.close()
        }
    })
    .command({
        command: "add <url>",
        builder: {
            url: {
                type: "string"
            }
        },
        handler: async (args: { url: string }) => {
            const cli = await client.connect()
            initMongo(cli)
            const db = cli.db(dbName).collection(colName)

            let fic: FictionEntry = await scrapeAO3(args.url)
            let results = await db.updateOne({ sources: { $in: fic.sources } }, { $set: fic }, { upsert: true })

            if (results.upsertedCount > 0) {
                console.log(chalk`{whiteBright ${fic.title}} {dim by:} {whiteBright ${fic.author}} {dim has successfully been added to the database.}`)
            } else {
                let entry: FictionEntryDatabase = await db.findOne({ sources: { $in: fic.sources } })
                console.log(chalk`{whiteBright ${fic.title}} {dim by:} {whiteBright ${fic.author}} {dim is already in the database:}`)
                console.log(renderFictionEntry(entry))
            }

            client.close()
        }
    })
    .command({
        command: "rm <id>",
        builder: {
            id: {
                type: "string"
            }
        },
        handler: async (args: { id: string }) => {
            const cli = await client.connect()
            initMongo(cli)
            const db = cli.db(dbName).collection(colName)

            let results = await db.remove({ _id: new ObjectID(args.id) })

            if (results.result.n > 0) {
                console.log(chalk`{whiteBright ${args.id}} {dim has been removed from the database successfully.}`)
            } else {
                console.log(chalk`{dim No fic with id} {whiteBright ${args.id}} {dim was found.}`)
            }

            client.close()
        }
    })
    .help()
    .argv
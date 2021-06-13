import cheerio from "cheerio"
import axios from "axios"
import { FictionEntry } from "../FictionEntry"
import Scraper from "../Scraper"

function processAO3Url(url: string): string {
    let split = url.split("/")

    return split.length > 5 ? split.slice(0, 5).join("/") : url
}

export default class Ao3 implements Scraper {
    domain = "archiveofourown.org"

    static async get(url: string): Promise<FictionEntry> {
        const $ = cheerio.load((await axios.get(url)).data)

        const title = $("#workskin .preface h2.heading").text().replace(/\n\s+/g, "")
        const author = $("#workskin .preface h3.heading a").text()

        const rating = $(".work .wrapper dl dd.rating.tags ul li a").text()
        const warnings = $(".work .wrapper dl dd.warning.tags ul li a").toArray().map(e => $(e).text()).filter(e => e != "Creator Chose Not To Use Archive Warnings" && e != "No Archive Warnings Apply")
        const fandom = $(".work .wrapper dl dd.fandom.tags ul li a").toArray().map(e => $(e).text())
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
            fandoms: fandom,
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
}
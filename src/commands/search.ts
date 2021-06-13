import { flags } from '@oclif/command'
import chalk = require('chalk')
import { MongoClient } from 'mongodb'
import Base from '../Base'
import { FictionEntryDatabase } from '../FictionEntry'
import renderFictionEntry from '../renderFictionEntry'

export default class Search extends Base {
  static description = 'Search the database using a mongodb query. Available keys: _id, title, author, fandoms, rating, characters, relationships, tags, wordcount, published, updated, complete, sources'

  static flags = {
    help: flags.help({char: 'h'}),

    noPage: flags.boolean({description: "If set, disables pagination. May cause performance issues."}),
    pageSize: flags.integer({default: 20})
  }

  static args = [{name: 'query', default: {}, parse: JSON.parse},{name: 'page', default: 1, parse: parseInt}]

  async run() {
    const {args, flags} = this.parse(Search)
    const client = await new MongoClient(this.userConfig.url, { useUnifiedTopology: true }).connect()
    const db = client.db(this.userConfig.dbName).collection(this.userConfig.collName)

    let find = db.find(args.query)
    let res: FictionEntryDatabase[];

    if (flags.noPage) {
      this.warn(chalk`Pagination has been {bgRed DISABLED}. This may cause performance issues with large databases.`)
      res = await find.toArray()
    } else {
      res = await find.skip(args.page > 0 ? (args.page - 1) * flags.pageSize : 0).limit(flags.pageSize).toArray()
    }

    if (res.length === 0) {
      this.log(chalk`{dim No fics matching those search terms were found.}`)
    }

    this.log(res.map(fic => renderFictionEntry(fic)).join("\n"))

    client.close()
  }
}

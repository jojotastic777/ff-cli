import { flags } from '@oclif/command'
import { MongoClient } from 'mongodb'
import * as chalk from 'chalk'
import Base from "../Base"
import { FictionEntryDatabase } from '../FictionEntry'
import renderFictionEntry from '../renderFictionEntry'

export default class List extends Base {
  static description = 'List all the fics in the database. Paginated by default.'

  static flags = {
    help: flags.help({char: 'h'}),
    noPage: flags.boolean({description: "If set, disables pagination. May cause performance issues."}),
    pageSize: flags.integer({default: 20})
  }

  static args = [{name: 'page', required: true, default: 1, parse: parseInt}]

  async run() {
    const {args, flags} = this.parse(List)
    const client = await new MongoClient(this.userConfig.url, { useUnifiedTopology: true }).connect()
    const db = client.db(this.userConfig.dbName).collection(this.userConfig.collName)

    let res: FictionEntryDatabase[];

    if (flags.noPage) {
      this.warn(chalk`Pagination has been {bgRed DISABLED}. This may cause performance issues with large databases.`)
      res = await db.find({}).toArray()
    } else {
      res = await db.find({}).skip(args.page > 0 ? (args.page - 1) * flags.pageSize : 0).limit(flags.pageSize).toArray()
    }

    if (res.length === 0) {
      this.log(chalk`{dim The fic database seems to be empty. You can fix that using the} {whiteBright ${this.config.name} add} {dim command.}`)
    }

    this.log(res.map(fic => renderFictionEntry(fic)).join("\n"))

    client.close()
  }
}

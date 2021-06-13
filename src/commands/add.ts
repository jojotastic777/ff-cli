import { flags } from '@oclif/command'
import * as chalk from "chalk"
import { MongoClient } from 'mongodb'
import Base from '../Base'
import { FictionEntryDatabase } from '../FictionEntry'
import renderFictionEntry from '../renderFictionEntry'
import Ao3 from '../scrapers/ao3'

export default class Add extends Base {
  static description = 'Add a fic to the database.'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [{name: 'url', required: true}]

  async run() {
    const {args, flags} = this.parse(Add)
    const client = await new MongoClient(this.userConfig.url, { useUnifiedTopology: true }).connect()
    const db = client.db(this.userConfig.dbName).collection(this.userConfig.collName)

    let fic = await Ao3.get(args.url)
    let results = await db.updateOne({ sources: { $in: fic.sources } }, { $set: fic }, { upsert: true })

    if (results.upsertedCount > 0) {
        this.log(chalk`{whiteBright ${fic.title}} {dim by:} {whiteBright ${fic.author}} {dim has successfully been added to the database.}`)
    } else {
        let entry: FictionEntryDatabase = await db.findOne({ sources: { $in: fic.sources } })
        this.log(chalk`{whiteBright ${fic.title}} {dim by:} {whiteBright ${fic.author}} {dim is already in the database:}`)
        this.log(renderFictionEntry(entry))
    }

    client.close()
  }
}

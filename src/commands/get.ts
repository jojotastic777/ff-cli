import { flags } from '@oclif/command'
import * as chalk from "chalk"
import { MongoClient, ObjectID } from 'mongodb'
import Base from '../Base'
import { FictionEntryDatabase } from '../FictionEntry'
import renderFictionEntry from '../renderFictionEntry'

export default class Get extends Base {
  static description = 'Get a specific fic from the database by it\'s id.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: "id", required: true}]

  async run() {
    const {args, flags} = this.parse(Get)
    const client = await new MongoClient(this.userConfig.url, { useUnifiedTopology: true }).connect()
    const db = client.db(this.userConfig.dbName).collection(this.userConfig.collName)
    
    let result: FictionEntryDatabase = await db.findOne({ _id: new ObjectID(args.id) })

    if (result) {
        this.log(renderFictionEntry(result))
    } else {
        this.log(chalk`{dim No fic with id} {whiteBright ${args.id}} {dim was found.}`)
    }

    client.close()
  }
}

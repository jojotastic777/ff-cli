import { flags } from '@oclif/command'
import * as chalk from "chalk"
import { MongoClient, ObjectID } from 'mongodb'
import Base from '../Base'

export default class Rm extends Base {
  static description = 'Remove a specific fic from the database by it\'s id.'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [{name: 'id', required: true}]

  async run() {
    const {args, flags} = this.parse(Rm)
    const client = await new MongoClient(this.userConfig.url, { useUnifiedTopology: true }).connect()
    const db = client.db(this.userConfig.dbName).collection(this.userConfig.collName)

    let results = await db.remove({ _id: new ObjectID(args.id) })

    if (results.result.n > 0) {
        this.log(chalk`{whiteBright ${args.id}} {dim has been removed from the database successfully.}`)
    } else {
        this.log(chalk`{dim No fic with id} {whiteBright ${args.id}} {dim was found.}`)
    }

    client.close()
  }
}

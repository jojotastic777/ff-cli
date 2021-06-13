import { flags } from '@oclif/command'
import { MongoClient, ObjectID } from 'mongodb'
import * as chalk from 'chalk'
import Base from '../Base'

export default class AddFandom extends Base {
  static description = 'Add a fandom to a specified fic\'s fandoms list.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: "id"}, {name: "fandom"}]

  async run() {
    const {args, flags} = this.parse(AddFandom)
    const client = await new MongoClient(this.userConfig.url, { useUnifiedTopology: true }).connect()
    const db = client.db(this.userConfig.dbName).collection(this.userConfig.collName)

    let results = await db.updateOne({ _id: new ObjectID(args.id) }, { $push: { fandoms: args.fandom } })

    if (results.modifiedCount > 0) {
        this.log(chalk`{whiteBright ${args.id}} {dim was successfully updated.}`)
    } else {
      this.log(chalk`{dim No fic with id} {whiteBright ${args.id}} {dim was found.}`)
    }

    client.close()
  }
}

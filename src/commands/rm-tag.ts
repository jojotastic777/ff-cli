import { flags } from '@oclif/command'
import { MongoClient, ObjectID } from 'mongodb'
import * as chalk from 'chalk'
import Base from '../Base'

export default class RmTag extends Base {
  static description = 'Remove a tag from a specified fic\'s tags list.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: "id"}, {name: "tag"}]

  async run() {
    const {args, flags} = this.parse(RmTag)
    const client = await new MongoClient(this.userConfig.url, { useUnifiedTopology: true }).connect()
    const db = client.db(this.userConfig.dbName).collection(this.userConfig.collName)

    let results = await db.updateOne({ _id: new ObjectID(args.id) }, { $pull: { tags: args.tag } })

    if (results.modifiedCount > 0) {
        this.log(chalk`{whiteBright ${args.id}} {dim was successfully updated.}`)
    } else {
      this.log(chalk`{dim No fic with id} {whiteBright ${args.id}} {dim was found.}`)
    }

    client.close()
  }
}

import { flags } from '@oclif/command'
import { MongoClient, ObjectID } from 'mongodb'
import * as chalk from 'chalk'
import Base from '../Base'

export default class RmRelationship extends Base {
  static description = 'Remove a relationship from a specified fic\'s relationships list.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: "id"}, {name: "relationship"}]

  async run() {
    const {args, flags} = this.parse(RmRelationship)
    const client = await new MongoClient(this.userConfig.url, { useUnifiedTopology: true }).connect()
    const db = client.db(this.userConfig.dbName).collection(this.userConfig.collName)

    let results = await db.updateOne({ _id: new ObjectID(args.id) }, { $pull: { relationships: args.relationship.split("/") } })

    if (results.modifiedCount > 0) {
        this.log(chalk`{whiteBright ${args.id}} {dim was successfully updated.}`)
    } else {
      this.log(chalk`{dim No fic with id} {whiteBright ${args.id}} {dim was found.}`)
    }

    client.close()
  }
}

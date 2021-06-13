import { Command, flags } from '@oclif/command'
import * as chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'

export default class ConfigGet extends Command {
  static description = 'Read the program configuration.'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [{name: "key", default: "all"}]

  async run() {
    const {args, flags} = this.parse(ConfigGet)

    let config = JSON.parse(fs.readFileSync(path.join(this.config.configDir, "config.json")).toString())

    if (args.key === "all") {
      console.log(config)
    } else if (Object.keys(config).includes(args.key)) {
      console.log(chalk`{dim ${args.key}:} {whiteBright ${JSON.stringify(config[args.key])}}`)
    } else {
      console.log(chalk`{dim No such key:} {whiteBright ${args.key}}`)
    }
  }
}

import { Command, flags } from '@oclif/command'
import * as chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'

export default class ConfigGet extends Command {
  static description = 'Set the program configuration.'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [{name: "key", required: true}, {name: "value", required: true}]

  async run() {
    const {args, flags} = this.parse(ConfigGet)

    let config = JSON.parse(fs.readFileSync(path.join(this.config.configDir, "config.json")).toString())

    if (Object.keys(config).includes(args.key)) {
      config[args.key] = args.value
      fs.writeFileSync(path.join(this.config.configDir, "config.json"), JSON.stringify(config))

      console.log(chalk`{whiteBright ${args.key}} {dim has been set to} {whiteBright ${JSON.stringify(config[args.key])}}{dim .}`)
    } else {
      console.log(chalk`{dim No such key:} {whiteBright ${args.key}}`)
    }
  }
}

import { Command } from '@oclif/command'
import { IConfig } from '@oclif/config'
import * as fs from 'fs'
import * as path from 'path'

export default abstract class extends Command {
    public userConfig: {
        url: string,
        dbName: string,
        collName: string
    }

    constructor (argv: string[], config: IConfig) {
        super(argv, config)

        if (!fs.existsSync(this.config.configDir)) {
            fs.mkdirSync(this.config.configDir)
        }

        if (!fs.existsSync(path.join(this.config.configDir, "config.json"))) {
            fs.writeFileSync(path.join(this.config.configDir, "config.json"), JSON.stringify({
                url: 'mongodb://localhost:27017',
                dbName: 'ffdb',
                collName: 'fics'
            }))
        }

        this.userConfig = JSON.parse(fs.readFileSync(path.join(this.config.configDir, "config.json")).toString())
    }
}
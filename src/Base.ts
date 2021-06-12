import { Command } from '@oclif/command'
import { IConfig } from '@oclif/config'

export default abstract class extends Command {
    public userConfig: {
        url: string,
        dbName: string,
        collName: string
    }

    constructor (argv: string[], config: IConfig) {
        super(argv, config)

        this.userConfig = {
            url: "mongodb://192.168.1.85:49153",
            dbName: "ffdb",
            collName: "fics"
        }
    }
}
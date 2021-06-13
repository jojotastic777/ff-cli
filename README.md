ff-cli
======

Fanfiction Database CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ff-cli.svg)](https://npmjs.org/package/ff-cli)
[![Downloads/week](https://img.shields.io/npm/dw/ff-cli.svg)](https://npmjs.org/package/ff-cli)
[![License](https://img.shields.io/npm/l/ff-cli.svg)](https://github.com/jojotastic777/ff-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ff-cli
$ ff-cli COMMAND
running command...
$ ff-cli (-v|--version|version)
ff-cli/0.1.0 linux-x64 node-v12.18.3
$ ff-cli --help [COMMAND]
USAGE
  $ ff-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ff-cli add URL`](#ff-cli-add-url)
* [`ff-cli get ID`](#ff-cli-get-id)
* [`ff-cli help [COMMAND]`](#ff-cli-help-command)
* [`ff-cli list PAGE`](#ff-cli-list-page)
* [`ff-cli rm ID`](#ff-cli-rm-id)
* [`ff-cli search [FILE]`](#ff-cli-search-file)

## `ff-cli add URL`

describe the command here

```
USAGE
  $ ff-cli add URL

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/add.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/add.ts)_

## `ff-cli get ID`

describe the command here

```
USAGE
  $ ff-cli get ID

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/get.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/get.ts)_

## `ff-cli help [COMMAND]`

display help for ff-cli

```
USAGE
  $ ff-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `ff-cli list PAGE`

describe the command here

```
USAGE
  $ ff-cli list PAGE

OPTIONS
  -h, --help           show CLI help
  --noPage             If set, disables pagination. May cause performance issues.
  --pageSize=pageSize  [default: 20]
```

_See code: [src/commands/list.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/list.ts)_

## `ff-cli rm ID`

describe the command here

```
USAGE
  $ ff-cli rm ID

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/rm.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/rm.ts)_

## `ff-cli search [FILE]`

describe the command here

```
USAGE
  $ ff-cli search [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/search.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/search.ts)_
<!-- commandsstop -->

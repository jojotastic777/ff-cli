ff-cli
======

Fanfiction Database CLI (NOTE: Only works on archiveofourown fics for right now. Passing in any other kind of link *will* break the program.)

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
$ npm install -g
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
* [`ff-cli add-character [ID] [CHARACTER]`](#ff-cli-add-character-id-character)
* [`ff-cli add-fandom [ID] [FANDOM]`](#ff-cli-add-fandom-id-fandom)
* [`ff-cli add-relationship [ID] [RELATIONSHIP]`](#ff-cli-add-relationship-id-relationship)
* [`ff-cli add-tag [ID] [TAG]`](#ff-cli-add-tag-id-tag)
* [`ff-cli config-get [KEY]`](#ff-cli-config-get-key)
* [`ff-cli config-set KEY VALUE`](#ff-cli-config-set-key-value)
* [`ff-cli get ID`](#ff-cli-get-id)
* [`ff-cli help [COMMAND]`](#ff-cli-help-command)
* [`ff-cli list PAGE`](#ff-cli-list-page)
* [`ff-cli rm ID`](#ff-cli-rm-id)
* [`ff-cli rm-character [ID] [CHARACTER]`](#ff-cli-rm-character-id-character)
* [`ff-cli rm-fandom [ID] [FANDOM]`](#ff-cli-rm-fandom-id-fandom)
* [`ff-cli rm-relationship [ID] [RELATIONSHIP]`](#ff-cli-rm-relationship-id-relationship)
* [`ff-cli rm-tag [ID] [TAG]`](#ff-cli-rm-tag-id-tag)
* [`ff-cli search [QUERY] [PAGE]`](#ff-cli-search-query-page)
* [`ff-cli set-rating [ID] [RATING]`](#ff-cli-set-rating-id-rating)

## `ff-cli add URL`

Add a fic to the database.

```
USAGE
  $ ff-cli add URL

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/add.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/add.ts)_

## `ff-cli add-character [ID] [CHARACTER]`

Add a character to a specified fic's characters list.

```
USAGE
  $ ff-cli add-character [ID] [CHARACTER]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/add-character.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/add-character.ts)_

## `ff-cli add-fandom [ID] [FANDOM]`

Add a fandom to a specified fic's fandoms list.

```
USAGE
  $ ff-cli add-fandom [ID] [FANDOM]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/add-fandom.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/add-fandom.ts)_

## `ff-cli add-relationship [ID] [RELATIONSHIP]`

Add a relationship to a specified fic's relationships list.

```
USAGE
  $ ff-cli add-relationship [ID] [RELATIONSHIP]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/add-relationship.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/add-relationship.ts)_

## `ff-cli add-tag [ID] [TAG]`

Add a tag to a specified fic's tags list.

```
USAGE
  $ ff-cli add-tag [ID] [TAG]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/add-tag.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/add-tag.ts)_

## `ff-cli config-get [KEY]`

Read the program configuration.

```
USAGE
  $ ff-cli config-get [KEY]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config-get.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/config-get.ts)_

## `ff-cli config-set KEY VALUE`

Set the program configuration.

```
USAGE
  $ ff-cli config-set KEY VALUE

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config-set.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/config-set.ts)_

## `ff-cli get ID`

Get a specific fic from the database by it's id.

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

List all the fics in the database. Paginated by default.

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

Remove a specific fic from the database by it's id.

```
USAGE
  $ ff-cli rm ID

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/rm.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/rm.ts)_

## `ff-cli rm-character [ID] [CHARACTER]`

Remove a character from a specified fic's characters list.

```
USAGE
  $ ff-cli rm-character [ID] [CHARACTER]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/rm-character.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/rm-character.ts)_

## `ff-cli rm-fandom [ID] [FANDOM]`

Remove a fandom from a specified fic's fandoms list.

```
USAGE
  $ ff-cli rm-fandom [ID] [FANDOM]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/rm-fandom.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/rm-fandom.ts)_

## `ff-cli rm-relationship [ID] [RELATIONSHIP]`

Remove a relationship from a specified fic's relationships list.

```
USAGE
  $ ff-cli rm-relationship [ID] [RELATIONSHIP]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/rm-relationship.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/rm-relationship.ts)_

## `ff-cli rm-tag [ID] [TAG]`

Remove a tag from a specified fic's tags list.

```
USAGE
  $ ff-cli rm-tag [ID] [TAG]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/rm-tag.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/rm-tag.ts)_

## `ff-cli search [QUERY] [PAGE]`

Search the database using a mongodb query. Available keys: _id, title, author, fandoms, rating, characters, relationships, tags, wordcount, published, updated, complete, sources

```
USAGE
  $ ff-cli search [QUERY] [PAGE]

OPTIONS
  -h, --help           show CLI help
  --noPage             If set, disables pagination. May cause performance issues.
  --pageSize=pageSize  [default: 20]
```

_See code: [src/commands/search.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/search.ts)_

## `ff-cli set-rating [ID] [RATING]`

Set a fic's rating.

```
USAGE
  $ ff-cli set-rating [ID] [RATING]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/set-rating.ts](https://github.com/jojotastic777/ff-cli/blob/v0.1.0/src/commands/set-rating.ts)_
<!-- commandsstop -->

import { ObjectID } from "mongodb"

type title = string
type author = string
type fandom = string
type rating = string
type character = string
type relationship = character[]
type tag = string
type source = string

export interface FictionEntry {
    title: title
    author: author
    fandoms: fandom[]
    rating: rating
    characters: character[]
    relationships: relationship[]
    tags: tag[]
    wordcount: number,
    published: Date
    updated: Date
    complete: boolean
    sources: source[]
}

export interface FictionEntryDatabase extends FictionEntry {
    _id: ObjectID
}
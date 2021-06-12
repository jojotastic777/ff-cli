import { FictionEntry } from "./FictionEntry";

let dummyEntry: FictionEntry = {
    title: "",
    author: "",
    fandom: [],
    rating: "",
    characters: [],
    relationships: [],
    tags: [],
    wordcount: 0,
    published: new Date(),
    updated: new Date(),
    complete: false,
    sources: []
}

export default abstract class {
    public abstract domain: string;

    public static async get(url: string): Promise<FictionEntry> { return dummyEntry } // Would be abstract, if typescript let me do that.
}
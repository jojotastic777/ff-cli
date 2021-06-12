import { FictionEntry, FictionEntryDatabase } from "./FictionEntry";
import * as chalk from "chalk"

function checkFicAlive(fic: FictionEntry): string {
    if (fic.complete) { return chalk.whiteBright("Completed") }

    let years = (new Date()).getFullYear() - fic.updated.getFullYear()
    let months = years * 12 + ((new Date()).getMonth() - fic.updated.getMonth())

    if (months <= 3)  { return chalk.whiteBright("Alive") }
    if (months <= 7)  { return chalk.white("Probably Alive") }
    if (months <= 18) { return chalk.gray("Possibly Dead") }
    if (years <= 3)   { return chalk.blackBright("Almost Certainly Dead") }
    return chalk.bgWhite.black(`Sleeping`)
}

function renderDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${date.getDay().toString().padStart(2, "0")}`
}

export default function renderFictionEntry(fic: FictionEntryDatabase): string {
    return [
        chalk`{dim >} ${chalk.whiteBright(fic.title)} {dim by:} ${chalk.whiteBright(fic.author)} {dim (ID: ${fic._id ?? "test"})}`,
        `    ${chalk.dim("Rating:")} ${chalk.whiteBright(fic.rating)}`,
        `    ${chalk.dim("Fandom:")} ${fic.fandom.map(a => chalk.whiteBright(a)).join(chalk.dim(", "))}`,
        `    ${chalk.dim("Relationships:")} ${fic.relationships.map(a => chalk.whiteBright(a.join("/"))).join(chalk.dim(", "))}`,
        `    ${chalk.dim("Characters:")} ${fic.characters.map(a => chalk.whiteBright(a)).join(chalk.dim(", "))}`,
        `    ${chalk.dim("Tags:")} ${fic.tags.map(a => chalk.whiteBright(a)).join(chalk.dim(", "))}`,
        chalk`    {dim Words:} {whiteBright ${fic.wordcount}} {dim Published:} {whiteBright ${renderDate(fic.published)}} {dim Updated:} {whiteBright ${renderDate(fic.updated)}} {dim Status:} ${checkFicAlive(fic)}`,
        `    ${chalk.dim("Links:")} ${fic.sources.map((e, i) => i === 0 ? chalk.blueBright(e) : `           ${chalk.blueBright(e)}`).join("\n")}`
    ].join("\n")
}
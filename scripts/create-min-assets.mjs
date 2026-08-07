import { copyFile, readdir } from "node:fs/promises"
import { extname, join } from "node:path"
import { fileURLToPath } from "node:url"

const outputDirectory = fileURLToPath(new URL("../out/", import.meta.url))
let generated = 0

async function createCopies(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const source = join(directory, entry.name)
    if (entry.isDirectory()) {
      await createCopies(source)
      continue
    }
    if (entry.name.includes(".min.")) continue
    const extension = extname(entry.name)
    if (extension !== ".js" && extension !== ".css") continue
    const target = join(directory, `${entry.name.slice(0, -extension.length)}.min${extension}`)
    await copyFile(source, target)
    generated += 1
  }
}

await createCopies(outputDirectory)
console.log(`Generated ${generated} additional .min.js/.min.css static assets.`)

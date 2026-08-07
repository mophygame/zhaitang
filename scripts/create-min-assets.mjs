import { copyFile, readdir } from "node:fs/promises"
import { extname, join } from "node:path"
import { fileURLToPath } from "node:url"

const assetsDirectory = fileURLToPath(new URL("../dist/client/assets/", import.meta.url))
const entries = await readdir(assetsDirectory, { withFileTypes: true })
let generated = 0

for (const entry of entries) {
  if (!entry.isFile() || entry.name.includes(".min.")) continue
  const extension = extname(entry.name)
  if (extension !== ".js" && extension !== ".css") continue

  const source = join(assetsDirectory, entry.name)
  const targetName = `${entry.name.slice(0, -extension.length)}.min${extension}`
  await copyFile(source, join(assetsDirectory, targetName))
  generated += 1
}

console.log(`Generated ${generated} additional .min.js/.min.css assets.`)

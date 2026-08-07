import { cp, mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const source = fileURLToPath(new URL("../assets/", import.meta.url))
const publicTarget = fileURLToPath(new URL("../public/assets/", import.meta.url))
const outputTarget = fileURLToPath(new URL("../out/assets/", import.meta.url))

await mkdir(publicTarget, { recursive: true })
await cp(source, publicTarget, { recursive: true, force: true })

if (process.argv.includes("--output")) {
  await mkdir(outputTarget, { recursive: true })
  await cp(source, outputTarget, { recursive: true, force: true })
  console.log("Synced static assets to public/assets/ and out/assets/.")
} else {
  console.log("Synced static assets to public/assets/.")
}

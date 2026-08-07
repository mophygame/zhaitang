import { cp, mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const source = fileURLToPath(new URL("../assets/", import.meta.url))
const target = fileURLToPath(new URL("../public/assets/", import.meta.url))

await mkdir(target, { recursive: true })
await cp(source, target, { recursive: true, force: true })
console.log("Synced creator assets from assets/ to public/assets/.")

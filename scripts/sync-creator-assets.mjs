import { cpSync, mkdirSync, rmSync, statSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { basename } from "node:path"

const source = fileURLToPath(new URL("../assets/", import.meta.url))
const publicTarget = fileURLToPath(new URL("../public/assets/", import.meta.url))
const outputTarget = fileURLToPath(new URL("../out/assets/", import.meta.url))

const cloudflareAssetLimit = 25 * 1024 * 1024
const deployableAsset = path => {
  if (basename(path) === ".DS_Store") return false
  const info = statSync(path)
  if (info.isDirectory()) return true
  if (info.size <= cloudflareAssetLimit) return true
  console.warn(`Skipped asset over Cloudflare's 25 MiB limit: ${path}`)
  return false
}

const syncAssets = target => {
  rmSync(target, { recursive: true, force: true })
  mkdirSync(target, { recursive: true })
  cpSync(source, target, { recursive: true, force: true, filter: deployableAsset })
}

syncAssets(publicTarget)

if (process.argv.includes("--output")) {
  syncAssets(outputTarget)
  console.log("Synced static assets to public/assets/ and out/assets/.")
} else {
  console.log("Synced static assets to public/assets/.")
}

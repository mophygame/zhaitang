import { cp, mkdir, rm, stat } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { basename } from "node:path"

const source = fileURLToPath(new URL("../assets/", import.meta.url))
const publicTarget = fileURLToPath(new URL("../public/assets/", import.meta.url))
const outputTarget = fileURLToPath(new URL("../out/assets/", import.meta.url))

const cloudflareAssetLimit = 25 * 1024 * 1024
const deployableAsset = async path => {
  if (basename(path) === ".DS_Store") return false
  const info = await stat(path)
  if (info.isDirectory()) return true
  if (info.size <= cloudflareAssetLimit) return true
  console.warn(`Skipped asset over Cloudflare's 25 MiB limit: ${path}`)
  return false
}

const syncAssets = async target => {
  await rm(target, { recursive: true, force: true })
  await mkdir(target, { recursive: true })
  await cp(source, target, { recursive: true, force: true, filter: deployableAsset })
}

await syncAssets(publicTarget)

if (process.argv.includes("--output")) {
  await syncAssets(outputTarget)
  console.log("Synced static assets to public/assets/ and out/assets/.")
} else {
  console.log("Synced static assets to public/assets/.")
}

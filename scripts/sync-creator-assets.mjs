import { cpSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { basename, join } from "node:path"

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

const createVoiceManifest = target => {
  const voiceDirectory = join(target, "voice")
  let employees = []
  try {
    employees = readdirSync(voiceDirectory, { withFileTypes: true })
  } catch {
    return
  }

  const manifest = Object.fromEntries(employees
    .filter(entry => entry.isDirectory())
    .map(entry => {
      const employeeDirectory = join(voiceDirectory, entry.name)
      const files = readdirSync(employeeDirectory, { withFileTypes: true })
        .filter(file => file.isFile() && /\.(?:mp3|m4a|wav|ogg)$/i.test(file.name))
        .map(file => file.name)
        .sort((left, right) => left.localeCompare(right, "zh-Hant", { numeric: true }))
      return [entry.name, files]
    })
    .filter(([, files]) => files.length > 0))

  writeFileSync(join(voiceDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`)
}

const syncAssets = target => {
  rmSync(target, { recursive: true, force: true })
  mkdirSync(target, { recursive: true })
  cpSync(source, target, { recursive: true, force: true, filter: deployableAsset })
  createVoiceManifest(target)
}

syncAssets(publicTarget)

if (process.argv.includes("--output")) {
  syncAssets(outputTarget)
  console.log("Synced static assets to public/assets/ and out/assets/.")
} else {
  console.log("Synced static assets to public/assets/.")
}

import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import { createServer } from "node:http"
import { extname, join, normalize } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("../out/", import.meta.url))
const port = 3000
const types = {
  ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon", ".jpeg": "image/jpeg", ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname)
  const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "")
  let filePath = join(root, safePath)
  try {
    const info = await stat(filePath)
    if (info.isDirectory()) filePath = join(filePath, "index.html")
    await stat(filePath)
    response.writeHead(200, { "Content-Type": types[extname(filePath)] ?? "application/octet-stream" })
    createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
    createReadStream(join(root, "404.html")).pipe(response)
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Static site: http://localhost:${port}`)
})

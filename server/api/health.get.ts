import { readFileSync } from 'fs'
import { resolve } from 'path'

const startedAt = Date.now()

export default defineEventHandler(() => {
  let version = '0.0.0'
  try {
    const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8'))
    version = pkg.version || version
  } catch {}

  return {
    status: 'ok',
    version,
    uptime: Math.floor((Date.now() - startedAt) / 1000),
  }
})

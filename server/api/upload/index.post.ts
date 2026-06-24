import { writeFileSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export default defineEventHandler(async (event) => {
  checkAuth(event)

  const form = await readMultipartFormData(event)
  if (!form || !form.length) throw createError({ statusCode: 400, message: 'No file uploaded' })

  const file = form[0]
  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 400, message: `File too large (max ${MAX_SIZE / 1024 / 1024}MB)` })
  }

  const ext = file.filename?.split('.').pop()?.toLowerCase() || 'jpg'
  const allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  if (!allowed.includes(ext)) {
    throw createError({ statusCode: 400, message: `Invalid file type "${ext}". Allowed: ${allowed.join(', ')}` })
  }

  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const dir = resolve(process.cwd(), 'public/uploads')
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, name), file.data)

  return { data: { url: `/uploads/${name}` }, error: null }
})

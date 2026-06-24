export default defineEventHandler(async (event) => {
  checkAuth(event)
  const slug = getRouterParam(event, 'slug')
  const body = await readBody(event)
  const db = getDb()

  // Verify exists
  const existing = db.prepare('SELECT id FROM posts WHERE slug = ?').get(slug)
  if (!existing) {
    throw createError({ statusCode: 404, message: `Post "${slug}" not found` })
  }

  const fields: string[] = []
  const values: any[] = []

  for (const key of ['title', 'description', 'category', 'image', 'youtube', 'content', 'published']) {
    if (body[key] !== undefined) {
      fields.push(`${key} = ?`)
      values.push(body[key])
    }
  }
  if (body.tags !== undefined) {
    fields.push('tags = ?')
    values.push(JSON.stringify(body.tags))
  }

  if (fields.length === 0) {
    throw createError({ statusCode: 400, message: 'No fields to update' })
  }

  fields.push("updated_at = datetime('now')")
  values.push(slug)

  db.prepare(`UPDATE posts SET ${fields.join(', ')} WHERE slug = ?`).run(...values)
  return { data: { slug }, error: null }
})

export default defineEventHandler(async (event) => {
  checkAuth(event)
  const body = await readBody(event)
  const db = getDb()

  if (!body?.title?.trim()) {
    throw createError({ statusCode: 400, message: 'Title is required' })
  }

  const slug = (body.slug?.trim()) || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  // Check duplicate
  const existing = db.prepare('SELECT id FROM posts WHERE slug = ?').get(slug)
  if (existing) {
    throw createError({ statusCode: 409, message: `Slug "${slug}" already exists. Choose a different slug.` })
  }

  db.prepare(`
    INSERT INTO posts (slug, title, description, category, image, youtube, tags, content, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(slug, body.title.trim(), body.description || '', body.category || '', body.image || '', body.youtube || '', JSON.stringify(body.tags || []), body.content || '', body.published ?? 1)

  return { data: { slug }, error: null }
})

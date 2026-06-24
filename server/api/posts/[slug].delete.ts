export default defineEventHandler(async (event) => {
  checkAuth(event)
  const slug = getRouterParam(event, 'slug')
  const db = getDb()

  const existing = db.prepare('SELECT id FROM posts WHERE slug = ?').get(slug)
  if (!existing) {
    throw createError({ statusCode: 404, message: `Post "${slug}" not found` })
  }

  db.prepare('DELETE FROM posts WHERE slug = ?').run(slug)
  return { data: { deleted: slug }, error: null }
})

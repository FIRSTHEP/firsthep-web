export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const db = getDb()
  const post = db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug) as any
  if (!post) throw createError({ statusCode: 404, message: `Post "${slug}" not found` })
  return { data: { ...post, tags: JSON.parse(post.tags || '[]') } }
})

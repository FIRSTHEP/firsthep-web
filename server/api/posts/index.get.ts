export default defineEventHandler((event) => {
  const db = getDb()
  const query = getQuery(event)
  const showAll = query.all !== undefined
  const limit = Math.min(Number(query.limit) || 50, 100)
  const offset = Number(query.offset) || 0

  let sql = 'SELECT * FROM posts'
  if (!showAll) sql += ' WHERE published = 1'
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'

  const posts = db.prepare(sql).all(limit, offset)
  const total = db.prepare(`SELECT COUNT(*) as c FROM posts${showAll ? '' : ' WHERE published = 1'}`).get() as any

  return {
    data: posts.map((p: any) => ({ ...p, tags: JSON.parse(p.tags || '[]') })),
    meta: { total: total.c, limit, offset },
  }
})

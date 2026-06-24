export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body?.password) {
    throw createError({ statusCode: 400, message: 'Password required' })
  }
  const token = loginAdmin(body.password)
  if (!token) {
    throw createError({ statusCode: 401, message: 'Invalid password' })
  }
  return { data: { token } }
})

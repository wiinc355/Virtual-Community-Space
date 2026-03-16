const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'dev-admin-token'

const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || ''

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing admin auth token' })
  }

  const token = authHeader.replace('Bearer ', '').trim()

  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Invalid admin auth token' })
  }

  next()
}

export { requireAdminAuth, ADMIN_TOKEN }

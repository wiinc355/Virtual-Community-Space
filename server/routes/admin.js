import express from 'express'
import { ADMIN_TOKEN } from '../middleware/adminAuth.js'

const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body || {}

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin'
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123'

  if (username !== expectedUsername || password !== expectedPassword) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  res.json({ token: ADMIN_TOKEN })
})

export default router

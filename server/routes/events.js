import express from 'express'
import { pool } from '../config/database.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY id ASC')

    const events = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      event_date: row.event_date,
      event_time: row.event_time,
      location: row.location,
      image: row.image
    }))

    res.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})

export default router
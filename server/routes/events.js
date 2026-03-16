import express from 'express'
import { pool } from '../config/database.js'
import { requireAdminAuth } from '../middleware/adminAuth.js'

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

router.get('/location/:locationId', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events WHERE location = $1 ORDER BY id ASC', [req.params.locationId])

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
    console.error('Error fetching location events:', error)
    res.status(500).json({ error: 'Failed to fetch location events' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const row = result.rows[0]
    res.json({
      id: row.id,
      title: row.title,
      event_date: row.event_date,
      event_time: row.event_time,
      location: row.location,
      image: row.image
    })
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({ error: 'Failed to fetch event' })
  }
})

router.post('/', requireAdminAuth, async (req, res) => {
  const { title, event_date, event_time, location, image } = req.body || {}

  try {
    const idResult = await pool.query('SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM events')
    const nextId = idResult.rows[0].next_id

    const result = await pool.query(
      `INSERT INTO events (id, title, event_date, event_time, location, image)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nextId, title, event_date, Number(event_time), Number(location), image]
    )

    const row = result.rows[0]
    res.status(201).json({
      id: row.id,
      title: row.title,
      event_date: row.event_date,
      event_time: row.event_time,
      location: row.location,
      image: row.image
    })
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({ error: 'Failed to create event' })
  }
})

router.put('/:id', requireAdminAuth, async (req, res) => {
  const { title, event_date, event_time, location, image } = req.body || {}

  try {
    const result = await pool.query(
      `
        UPDATE events
        SET title = $1, event_date = $2, event_time = $3, location = $4, image = $5
        WHERE id = $6
        RETURNING *
      `,
      [title, event_date, event_time, location, image, req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const row = result.rows[0]
    res.json({
      id: row.id,
      title: row.title,
      event_date: row.event_date,
      event_time: row.event_time,
      location: row.location,
      image: row.image
    })
  } catch (error) {
    console.error('Error updating event:', error)
    res.status(500).json({ error: 'Failed to update event' })
  }
})

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({ error: 'Failed to delete event' })
  }
})

export default router
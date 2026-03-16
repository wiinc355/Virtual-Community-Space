import express from 'express'
import { pool } from '../config/database.js'
import { requireAdminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations ORDER BY id ASC')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching locations:', error)
    res.status(500).json({ error: 'Failed to fetch locations' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations WHERE id = $1', [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching location:', error)
    res.status(500).json({ error: 'Failed to fetch location' })
  }
})

router.post('/', requireAdminAuth, async (req, res) => {
  const { name, address, city, state, zip, image } = req.body || {}

  try {
    const idResult = await pool.query('SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM locations')
    const nextId = idResult.rows[0].next_id

    const result = await pool.query(
      `INSERT INTO locations (id, name, address, city, state, zip, image)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nextId, name, address, city, state, zip, image]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating location:', error)
    res.status(500).json({ error: 'Failed to create location' })
  }
})

router.put('/:id', requireAdminAuth, async (req, res) => {
  const { name, address, city, state, zip, image } = req.body || {}

  try {
    const result = await pool.query(
      `
        UPDATE locations
        SET name = $1, address = $2, city = $3, state = $4, zip = $5, image = $6
        WHERE id = $7
        RETURNING *
      `,
      [name, address, city, state, zip, image, req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating location:', error)
    res.status(500).json({ error: 'Failed to update location' })
  }
})

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM locations WHERE id = $1 RETURNING id', [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location not found' })
    }

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting location:', error)
    res.status(500).json({ error: 'Failed to delete location' })
  }
})

export default router

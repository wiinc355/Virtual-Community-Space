import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import { pool } from './database.js'
import eventData from '../data/events.js'
import locationData from '../data/locations.js'

console.log('PGHOST:', process.env.PGHOST)
console.log('PGDATABASE:', process.env.PGDATABASE)

async function createLocationsTable() {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations CASCADE;

    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(50) NOT NULL,
      zip VARCHAR(20) NOT NULL,
      image TEXT
    );
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 locations table created successfully')
  } catch (err) {
    console.error('⚠️ error creating locations table', err)
    throw err
  }
}

async function seedLocationsTable() {
  const insertQuery = `
    INSERT INTO locations (id, name, address, city, state, zip, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `

  try {
    for (const location of locationData) {
      await pool.query(insertQuery, [
        location.id,
        location.name,
        location.address,
        location.city,
        location.state,
        location.zip,
        location.image
      ])
      console.log(`✅ ${location.name} added successfully`)
    }
    console.log(`✅ seeded ${locationData.length} locations`)
  } catch (err) {
    console.error('⚠️ error inserting locations', err)
    throw err
  }
}

async function createEventsTable() {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      event_date DATE NOT NULL,
      event_time INTEGER NOT NULL,
      location INTEGER NOT NULL,
      image TEXT
    );
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 events table created successfully')
  } catch (err) {
    console.error('⚠️ error creating events table', err)
    throw err
  }
}

async function seedEventsTable() {
  const insertQuery = `
    INSERT INTO events
    (id, title, event_date, event_time, location, image)
    VALUES ($1, $2, $3, $4, $5, $6);
  `

  try {
    for (const event of eventData) {
      const values = [
        event.id,
        event.title,
        event.event_date,
        event.event_time,
        event.location,
        event.image
      ]

      await pool.query(insertQuery, values)
      console.log(`✅ ${event.title} added successfully`)
    }

    console.log(`✅ seeded ${eventData.length} events`)
  } catch (err) {
    console.error('⚠️ error inserting events', err)
    throw err
  }
}

async function resetDatabase() {
  try {
    await createLocationsTable()
    await seedLocationsTable()
    await createEventsTable()
    await seedEventsTable()
  } catch (err) {
    console.error('❌ reset failed:', err)
  } finally {
    await pool.end()
  }
}

resetDatabase()
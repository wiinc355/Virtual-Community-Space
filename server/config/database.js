import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import pg from 'pg'

const { Pool } = pg

console.log('PGHOST:', process.env.PGHOST)
console.log('PGDATABASE:', process.env.PGDATABASE)

export const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
})
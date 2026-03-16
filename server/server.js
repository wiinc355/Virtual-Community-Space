import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'
import adminRouter from './routes/admin.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
}
else if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
}

app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)
app.use('/api/admin', adminRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
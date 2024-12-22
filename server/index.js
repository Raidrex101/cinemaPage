import express from 'express'
import { connect } from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import ticketRoutes from './routes/TicketRoutes.js'
import authRoutes from './routes/authRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import { syncronization } from './config/syncSchedule.js'
import cors from 'cors'

const PORT = process.env.PORT || 3000

const api = express()

api.use(express.json())

api.use(cors())
syncronization()

// rutas

/* api.use('/api/v1/users', userRoutes) */
api.use('/api/v1/movies', movieRoutes)
api.use('/api/v1/tickets', ticketRoutes)
api.use('/api/v1', authRoutes)
api.use('/api/v1', userRoutes)
api.use('/api/v1/rooms', roomRoutes)

connect().then(() => {
  api.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
  })
})

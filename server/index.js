import express from 'express'
import { connect } from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import ticketRoutes from './routes/TicketRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cron from 'node-cron'
import { syncGenresAndMovies } from './config/tmdbSync.js'

const PORT = process.env.PORT || 3000

const api = express()

api.use(express.json())

// rutas

/* api.use('/api/v1/users', userRoutes) */
api.use('/api/v1/movies', movieRoutes)
api.use('/api/v1/tickets', ticketRoutes)
api.use('/api/v1', authRoutes)
api.use('/api/v1', userRoutes)

// configure  syncronization whit TMDB each monday
cron.schedule('0 0 1 * *', async () => { // cron will schedule tmdb calls to now_playing on the first day of every month at midnight
  try {
    await syncGenresAndMovies()
    console.log('TMDB movies syncronized')
  } catch (error) {
    console.error('TMDB movies syncronization error', error)
  }
})

connect().then(() => {
  api.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
  })
})

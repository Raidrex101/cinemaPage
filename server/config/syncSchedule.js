import cron from 'node-cron'
import { syncGenresAndMovies } from './tmdbSync.js'
import Movie from '../models/movieModel.js'

// configure  syncronization whit TMDB each monday
const syncronization = () => {
  cron.schedule('0 0 1 * *', async () => { // cron will schedule tmdb calls to now_playing on the first day of every month at midnight
    try {
      const activeMovies = await Movie.find({ isActive: true })

      const syncMovies = await syncGenresAndMovies()

      const syncNames = new Set(syncMovies.map(movie => movie.name.toLowerCase()))

      const inactiveMovies = activeMovies.filter(movie => !syncNames.has(movie.name.toLowerCase()))

      if (inactiveMovies.length > 0) {
        await Movie.updateMany(
          { _id: { $in: inactiveMovies.map(movie => movie._id) } },
          { $set: { isActive: false } }
        )
      }
      console.log('TMDB movies syncronized')
    } catch (error) {
      console.error('TMDB movies syncronization error', error)
    }
  })
}

export { syncronization }

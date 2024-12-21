import cron from 'node-cron'
import { syncGenresAndMovies } from './tmdbSync.js'
import Movie from '../models/movieModel.js'

// Configure synchronization with TMDB on the first day of every month at midnight
const syncronization = () => {
  cron.schedule('0 0 1 * *', async () => { // cron will schedule TMDB calls to now_playing list
    try {
      const activeMovies = await Movie.find({ isActive: true })// find all active movies

      const syncMovies = await syncGenresAndMovies() // synchronize al the needed data from TMDB

      const syncNames = new Set(syncMovies.map(movie => movie.name.toLowerCase())) // maping the names the synchronized movies

      const inactiveMovies = activeMovies.filter(movie => !syncNames.has(movie.name.toLowerCase())) // Filter movies in the DB but not in the synchronized movies from TMDB

      if (inactiveMovies.length > 0) {
        await Movie.updateMany( // Update isActive to false for movies not in synchronized movies
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

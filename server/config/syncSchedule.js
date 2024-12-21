import cron from 'node-cron'
import { syncGenresAndMovies } from './tmdbSync.js'
import Movie from '../models/movieModel.js'

// Configure synchronization with TMDB on the first day of every month at midnight
const syncronization = () => {
  cron.schedule('0 0 1 * *', async () => { // cron will schedule TMDB calls to now_playing list
    try {
      const activeMovies = await Movie.find({ isActive: true })// find all active movies in the DB

      const syncMovies = await syncGenresAndMovies() // synchronize al the needed data from TMDB

      if (!syncMovies || syncMovies.length === 0) {
        console.error('Syncronization returned no movies. Skipping update.')
        return
      }

      const syncIds = new Set(syncMovies.map(movie => movie.tmdbId)) // maping the ids of the synchronized movies in a new set

      const inactiveMovies = activeMovies.filter(movie => !syncIds.has(movie.tmdbId)) // Filter movies in the DB but not in the synchronized movies from TMDB

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

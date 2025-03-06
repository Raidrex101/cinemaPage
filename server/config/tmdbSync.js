import dotenv from 'dotenv'
import axios from 'axios'
import Genre from '../models/genreModel.js'
import Movie from '../models/movieModel.js'
import Directors from '../models/directorsModel.js'
import Cast from '../models/castModel.js'

dotenv.config()

const API_KEY = process.env.TMDB_API_KEY

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
})

const syncGenresAndMovies = async () => {
  try {
    const syncedMovies = []
    // Getting Genres from TMDB
    const genreResponse = await axiosInstance.get('/genre/movie/list', {
      params: { language: 'en-Us' }
    })

    const genres = genreResponse.data.genres
    if (!genres || genres.length === 0) {
      console.error('No genres fetched from TMDB. Aborting synchronization.')
      return []
    }

    const genreMap = new Map()
    // Generation or getting the genres from TMDB to our database
    const genreModels = await Promise.all(
      genres.map(async (genre) => {
        if (genreMap.has(genre.id)) return genreMap.get(genre.id)
        const existingGenre = await Genre.findOne({ tmdbId: genre.id })
        const newGenre =
          existingGenre ||
          (await Genre.create({ name: genre.name, tmdbId: genre.id }))
        genreMap.set(genre.id, newGenre)
        return newGenre
      })
    )

    // Getting Movies now playing from TMDB
    const moviesResponse = await axiosInstance.get('/movie/now_playing', {
      params: { language: 'en-Us', page: 1 }
    })
    const movies = moviesResponse.data?.results || []
    if (!movies || movies.length === 0) {
      console.error('No movies fetched from TMDB. Aborting synchronization.')
      return []
    }
    // Generation or getting the cast and directors from TMDB to our database
    await Promise.all(
      movies.map(async (movie) => {
        const [movieDetails, movieCredits] = await Promise.all([
          axiosInstance.get(
            `/movie/${movie.id}`, {
              params: { language: 'en-Us' }
            }),
          axiosInstance.get(
              `/movie/${movie.id}/credits`, {
                params: { language: 'en-Us' }
              })
        ])

        const { runtime } = movieDetails.data
        const { crew } = movieCredits.data

        // processing directors
        const directors = crew.filter((person) => person.job === 'Director')
        const directorMap = new Map()
        const directorModel = await Promise.all(
          directors.map(async (director) => {
            if (directorMap.has(director.id)) return directorMap.get(director.id)
            const existingDirector = await Directors.findOne({ tmdbId: director.id })
            const newDirector =
              existingDirector ||
              (await Directors.create({
                firstName: director.name.split(' ')[0] || director.name,
                lastName: director.name.split(' ').slice(1).join(' ') || '',
                tmdbId: director.id
              }))
            directorMap.set(director.id, newDirector)
            return newDirector
          })
        )

        // processing cast
        const cast = movieCredits.data.cast || []
        const topCast = cast.slice(0, 5)
        const castMap = new Map()
        const castModel = await Promise.all(
          topCast.map(async (actor) => {
            if (castMap.has(actor.id)) return castMap.get(actor.id)
            const existingActor = await Cast.findOne({ tmdbId: actor.id })
            const newActor =
              existingActor ||
              (await Cast.create({
                firstName: actor.name.split(' ')[0] || actor.name,
                lastName: actor.name.includes(' ')
                  ? actor.name.split(' ').slice(1).join(' ')
                  : '',
                tmdbId: actor.id
              }))
            castMap.set(actor.id, newActor)
            return newActor
          })
        )

        const existingMovie = await Movie.findOne({ tmdbId: movie.id })
        if (existingMovie) {
          syncedMovies.push(existingMovie) // if the movie exist in our db its added to syncedMovies
          return // preventing the creation of the existing movie
        }

        const newMovie = await Movie.create({ // if the movie does not exist in our db it is created
          tmdbId: movie.id,
          name: movie.title,
          genre: genreModels
            .filter((g) => movie.genre_ids.includes(g.tmdbId))
            .map((g) => g._id),
          releaseDate: movie.release_date,
          director: directorModel.map((d) => d._id),
          cast: castModel.map((c) => c._id),
          durationMins: runtime || 120,
          functionTime: new Date(),
          rating: movie.vote_average,
          seatPrice: 10,
          overview: movie.overview,
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : null
        })

        syncedMovies.push(newMovie)
      })
    )
    return syncedMovies
  } catch (error) {
    console.error('Error syncing the movie:', error)
    return []
  }
}

export { syncGenresAndMovies }

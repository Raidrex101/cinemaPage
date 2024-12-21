import Movie from '../models/movieModel.js'
import Directors from '../models/directorsModel.js'
import Cast from '../models/castModel.js'
import Genre from '../models/genreModel.js'

// CREATE

const createMovie = async (req, res) => {
  const movieData = req.body

  // Validations
  if (!movieData || Object.keys(movieData).length === 0) {
    return res.status(400).json({ message: 'No movie data provided' })
  }

  // validando que director y cast sean un array
  if (!Array.isArray(movieData.director) || movieData.director.length === 0) {
    return res
      .status(400)
      .json({ message: 'Director must be an array with at least one element' })
  }

  if (!Array.isArray(movieData.cast) || movieData.cast.length === 0) {
    return res
      .status(400)
      .json({ message: 'Cast must be an array with at least one element' })
  }

  if (!Array.isArray(movieData.genres) || movieData.genres.length === 0) {
    return res
      .status(400)
      .json({ message: 'Genres must be an array with at least one element' })
  }

  // si el actor del reparto o el director no estan en la tabla correspondiente los crea

  try {
    const directorIds = await Promise.all(
      movieData.director.map(async (director) => {
        const existingDirector = await Directors.findOne({
          firstName: director.firstName,
          lastName: director.lastName
        })
        return existingDirector
          ? existingDirector._id
          : (await Directors.create(director))._id
      })
    )

    const castIds = await Promise.all(
      movieData.cast.map(async (actor) => {
        const existingActor = await Cast.findOne({
          firstName: actor.firstName,
          lastName: actor.lastName
        })
        return existingActor
          ? existingActor._id
          : (await Cast.create(actor))._id
      })
    )

    const genreIds = await Promise.all(
      movieData.genres.map(async (genre) => {
        const existingGenre = await Genre.findOne({ tmdbId: genre.id })
        return existingGenre
          ? existingGenre._id
          : (await Genre.create({ name: genre.name, tmdbId: genre.id }))._id
      })
    )

    const newMovie = await Movie.create({
      ...movieData,
      director: directorIds,
      cast: castIds,
      genres: genreIds
    })

    res.status(201).json(newMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ

const getAllMovies = async (req, res) => {
  const { name, releaseDate, rating, genre } = req.query
  const filter = { isActive: true }

  if (name) {
    filter.name = new RegExp(name, 'i') // Búsqueda por título
  }

  if (releaseDate) {
    const date = new Date(releaseDate)

    if (releaseDate.length === 4) {
      // por si se escribe solo el año
      filter.releaseDate = {
        $gte: new Date(date.getFullYear(), 0, 1), // si se escribe solo el año en la peticion buscara en todo ese año empezando por 0 = enero 1 = dia
        $lte: new Date(date.getFullYear(), 11, 31) // 11 = diciembre 31 = dia
      }
    } else if (releaseDate.lenght === 7) {
      // por si se escribe solo el año y el mes
      filter.releaseDate = {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1), // 1 = primer dia del mes
        $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0) // +1 = diciembre 0 = un dia antes de diciembre por si el mes solicitado termian en 28, 30 o 31 siempre lo regrese bien
      }
    } else {
      filter.releaseDate = date // si se escribe la fecha especifica se manda tal cual
    }
  }

  if (rating) {
    const minRating = Math.floor(rating) // toma el numero ingresado y lo redondea hacia abajo 8.9 = 8
    const maxRating = minRating + 0.9 // a el numero ingresado le suma 0.9 para que la consulta retorne rating desde 8.0 hasta 8.9 por ejemplo
    filter.rating = { $gte: minRating, $lte: maxRating } // entre 8.0 y 8.9 si hay peliculas en ese rango las retona todas
  }

  if (genre) {
    filter.genre = new RegExp(genre, 'i') // busca el genre
  }

  try {
    const movies = await Movie.find(filter)
      .populate('director', 'firstName lastName bio')
      .populate('cast', 'firstName lastName')
      .populate('genre', 'name')
      .populate('rooms', 'name seats occupiedSeats functionTimes')
    res.status(200).json(movies)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error getting movies:', error: error.message })
  }
}

// UPDATE

const updateMovie = async (req, res) => {
  const { movieId } = req.params
  const updatedData = req.body

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedData, {
      new: true
    })
    res.status(200).json(updatedMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE

const deleteMovie = async (req, res) => {
  const { movieId } = req.params
  if (!movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid movie ID' })
  }

  // HARD DELETE: Borrado físico de la base de datos.
  // Si recibo el query ?destroy=true, borro la pelicula de la base de datos
  if (req.query.destroy === 'true') {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.movieId)
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found for destroy' })
      }
      return res.status(204).end()
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  // SOFT DELETE: Cambio el estado (isActive) de la pelicula a inactivo (false)
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.movieId,
      { isActive: false },
      { new: false }
    )
    if (!movie || !movie.isActive) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.status(204).end()
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export { createMovie, getAllMovies, updateMovie, deleteMovie }

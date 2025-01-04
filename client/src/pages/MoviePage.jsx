import { useContext } from 'react'
import { MovieContext } from '../context/movieContext'
import { useParams } from 'react-router-dom'
const MoviePage = () => {
    const { id } = useParams()
    const { movies } = useContext(MovieContext)

    const movie = movies.find((movie) => movie._id === id)
    
  return (
    <>
    {movie ? (
    <section className="d-flex align-items-center">
        <img className="rounded-4 w-25" src={movie.poster} alt={movie.name} />
        <h1>{movie.name}</h1>
        <p>{movie.overview}</p>
    </section>

    ): (
      <h1>Loading...</h1>
    )}
    
    </>
  )
}
export default MoviePage
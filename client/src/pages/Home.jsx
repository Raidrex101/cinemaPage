import { MovieContext } from "../context/movieContext"
import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import MovieCards from "../components/MovieCards"
import Carrousel from "../components/Carrousel"

const Home = () => {
  const { movies, refreshMovies } = useContext(MovieContext)
  const location = useLocation()

  // Reload movies when navigating to Home (ensures fresh data)
  useEffect(() => {
    if (location.pathname === "/") {
      refreshMovies()
    }
  }, [location, refreshMovies])

  return (
    <div className="text-center custommt ">
      <Carrousel />
      <section className="d-flex flex-wrap justify-content-evenly">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCards
              key={movie._id}
              id={movie._id}
              title={movie.name}
              overview={movie.overview}
              poster={movie.poster}
              duration={movie.durationMins}
              testid={`MovieCard-${movie._id}`}
            />
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </section>
    </div>
  )
}

export default Home
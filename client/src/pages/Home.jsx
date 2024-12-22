import { MovieContext } from "../context/movieContext"
import { useContext } from "react"
import MovieCards from "../components/MovieCards"
const Home = () => {
  const { movies } = useContext(MovieContext)
  
  return (
    <div className="container-fluid text-center custommt">
    <section className="d-flex flex-wrap justify-content-evenly pt-auto">
    {movies.length > 0 ? (
      movies.map((movie) => (
        <MovieCards
          key={movie._id}
          id={movie._id}
          title={movie.name}
          overview={movie.overview}
          poster={movie.poster}
          duration={movie.durationMins}
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
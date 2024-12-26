import { MovieContext } from "../context/movieContext"
import { useContext } from "react"
import { Link } from 'react-router-dom'

const Carrousel = () => {
    const { movies } = useContext(MovieContext)

    const selectedMovieNames = ['Sonic 3 : La película', 'Mufasa: El rey león', 'Moana 2', 'Wicked']
    const selectedMovies = movies.filter(movie => selectedMovieNames.includes(movie.name))
    console.log( 'peliculas para el carrusel',selectedMovies);
    
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {selectedMovies.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === 0 ? "true" : undefined}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {selectedMovies.map((movie, index) => (
          <div
            key={movie._id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="d-block">
            <img
              src={movie.poster}
              className="d-block w-100 carouselbg"
              alt={movie.name}
            />
            </div>
            <div className="container">
              <div className="carousel-caption text-end carouseltxt">
                <h1 className="fw-bold">{movie.name}</h1>
                <p>{movie.overview}</p>
                <p>
                  <Link className="btn btn-lg btn-primary" to={`/movie/${movie._id}`}>
                    Ver más
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>

  )
}
export default Carrousel
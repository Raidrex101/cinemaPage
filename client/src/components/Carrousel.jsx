import { MovieContext } from "../context/movieContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Carrousel = () => {
  const { movies } = useContext(MovieContext);
  const navigate = useNavigate();
  
  const selectedMoviesIndexes = [0, 2, 4, 13];

  const selectedMovies = selectedMoviesIndexes
    .map(index => movies[index])
    .filter(movie => movie !== undefined)

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
          <div key={movie._id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <div className="d-block carouselbg pt-3">
              <img
                role="button"
                onClick={() => navigate(`/buy-tickets/${movie._id}`)}
                src={movie.poster}
                className="d-block carouselimg"
                alt={movie.name}
              />
              <div className="carousel-caption carouseltxt">
                <h1 className="fw-bold carouselname">{movie.name}</h1>
                <p className="carouselp ctmtruncate">{movie.overview}</p>
                <p>
                  <Link className="btn btn-lg btn-primary carouselbtn" to={`/movie/${movie._id}`}>
                    Ver más
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carrousel;

import { useContext } from "react";
import { MovieContext } from "../context/movieContext";
import { useParams, useNavigate } from "react-router-dom";

const MoviePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { movies } = useContext(MovieContext);

  const movie = movies.find((movie) => movie._id === id);
  console.log('movie:', movie);
  

  return (
    <>
      {movie ? (
        <>
          <section className="position-relative vh-100 vw-100">
            {/* Fondo dinámico */}
            <div
              className='movie-background'
              style={{ backgroundImage: `url(${movie.poster})` }}
            >
            </div>

            <div className="position-relative z-3 d-flex align-items-center justify-content-center h-100 text-white">
              <img className="h-50 m-5" src={movie.poster} alt={movie.name} />
              <div className="bg-dark bg-opacity-50 p-4 rounded-4 text-center w-50">
                <h1>{movie.name}</h1>
                <h5>Overview</h5>
                <p>{movie.overview}</p>
                <button
                 className="btn btn-primary rounded-pill"
                 onClick={() => navigate(`/buy-tickets/${id}`)}
                 >Buy tickets </button>
              </div>
            </div>
          </section>

          <div className=" mt-4">
            <div className="row">
              
              <div className="col-md-6 bg-secondary bg-opacity-50 p-5 text-center rounded-3 fw-bold">
                <h1>Cast</h1>
                <ul className="list-unstyled">
                  {movie.cast.map((actor) => (
                    <li key={actor._id}>
                        {actor.firstName} {actor.lastName}
                        </li>
                  ))}
                </ul>
              </div>

              <div className=" col-md-6 bg-secondary bg-opacity-50 p-5 text-center rounded-3 fw-bold">
                <h1>Details</h1>
                <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
                <p>Genre: {' '}
                    {movie.genre.map((g, index) => (
                        <span key={g._id}>
                            {g.name}
                            {index < movie.genre.length - 1 && ', '}
                        </span>
                    ))}
                </p>
                <p>Rating: {movie.rating} Runtime: {movie.durationMins} minutes</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default MoviePage;

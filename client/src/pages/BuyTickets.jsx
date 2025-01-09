import { useContext, useState } from "react";
import { MovieContext } from "../context/movieContext";
import { useParams } from "react-router-dom";
import seatIcon from "../assets/seatIcon.svg";
import food from "../assets/food.svg";

const BuyTickets = () => {
  const { movieId } = useParams();
  const { movies } = useContext(MovieContext);
  const movie = movies.find((movie) => movie._id === movieId);
  const [activeStep, setActiveStep] = useState('Schedule')
  const isActive = (step) => activeStep === step
  console.log("movie", movie);

  return (
    <section className="position-relative vh-100 vw-100">
      <div
        className="movie-background"
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        <div className="position-absolute top-0 start-50 translate-middle m-5 bg-transparent shadow-lg align-items-center justify-content-center text-white">
           <div className="fw-bold">

            <span className={`fs-4 ${isActive('Schedule') ? '' : 'text-secondary'}`}>
           <i className="bi bi-clock-fill me-3"></i>
              Schedule
            </span>

            <i className="bi bi-caret-right-fill ms-2 me-3 fs-4 text-secondary"></i>

            <span className={`fs-4 ${isActive('Seats') ? '' : 'text-secondary'}`}>
           <img
          src={seatIcon}
          alt="Seats"
          className={`me-3 ms-2 ${isActive('Seats') ? 'svg-active' : 'svg-inactive'}`} />
           Seats
            </span>

            <i className="bi bi-caret-right-fill ms-2 me-3 fs-4 text-secondary"></i>

            <span className={`fs-4 ${isActive('Food') ? '' : 'text-secondary'}`}>
            
           <img
           src={food}
           alt="Seats"
           className={`me-3 ms-2 ${isActive('Food') ? 'svg-active' : 'svg-inactive'}`} />
           Food
            </span>
            <i className="bi bi-caret-right-fill ms-2 me-3 fs-4 text-secondary"></i>
            <span className={`fs-4 ${isActive('Seats') ? '' : 'text-secondary'}`}>
           <i className="bi bi-ticket-perforated-fill me-3 ms-2"></i>
              Payment
            </span>

            </div>
           </div>
      </div>

      <div className=" d-flex flex-column position-relative z-3 align-items-center justify-content-center h-100 text-white">
        <div className="bg-white p-4 rounded-5 text-center text-dark h-75 mt-5 shadow">
          <h1>{movie.name}</h1>
          <h5>Overview</h5>
          <p>{movie.overview}</p>
          <button className="btn btn-primary rounded-pill">Buy tickets</button>
        </div>
      </div>
    </section>
  );
};

export default BuyTickets;

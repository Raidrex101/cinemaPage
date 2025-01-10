import { useContext, useState } from "react";
import { MovieContext } from "../context/movieContext";
import { useParams } from "react-router-dom";
import TicketsForm from "../components/TicketsForm";

import seatIcon from "../assets/seatIcon.svg";
import food from "../assets/food.svg";

const BuyTickets = () => {
  const { movieId } = useParams();
  const { movies } = useContext(MovieContext);
  const movie = movies.find((movie) => movie._id === movieId);
  const [activeStep, setActiveStep] = useState("Schedule");
  const [cinemaName, setCinemaName] = useState("el cine placeholder");
  const isActive = (step) => activeStep === step;
  console.log("movie", movie);

  return (
    <section className="position-relative vh-100 vw-100">
      <div
        className="movie-background"
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        <div className="position-absolute top-0 start-50 translate-middle m-5 bg-transparent shadow-lg align-items-center justify-content-center text-white">
          <div className="fw-bold">
            <span
              className={`fs-4 ${isActive("Schedule") ? "" : "text-secondary"}`}
            >
              <i className="bi bi-clock-fill me-3"></i>
              Schedule
            </span>

            <i className="bi bi-caret-right-fill ms-2 me-3 fs-4 text-secondary"></i>

            <span
              className={`fs-4 ${isActive("Seats") ? "" : "text-secondary"}`}
            >
              <img
                src={seatIcon}
                alt="Seats"
                className={`me-3 ms-2 ${
                  isActive("Seats") ? "svg-active" : "svg-inactive"
                }`}
              />
              Seats
            </span>

            <i className="bi bi-caret-right-fill ms-2 me-3 fs-4 text-secondary"></i>

            <span
              className={`fs-4 ${isActive("Food") ? "" : "text-secondary"}`}
            >
              <img
                src={food}
                alt="Seats"
                className={`me-3 ms-2 ${
                  isActive("Food") ? "svg-active" : "svg-inactive"
                }`}
              />
              Food
            </span>

            <i className="bi bi-caret-right-fill ms-2 me-3 fs-4 text-secondary"></i>

            <span
              className={`fs-4 ${isActive("Seats") ? "" : "text-secondary"}`}
            >
              <i className="bi bi-ticket-perforated-fill me-3 ms-2"></i>
              Payment
            </span>
          </div>
        </div>
      </div>

      <div className="position-relative z-3 d-flex align-items-center justify-content-center h-100 text-white">
        <div className="bg-white p-2 rounded-5 text-center text-dark h-75 w-100 mt-5 shadow">
          <div className="container mt-4">
            <div className="row">
             
              <div className="col-lg-8">
                <div className="row align-items-center border rounded-3">
                  
                  <div className="col-auto ps-0">
                    <button className="btn btn-light">
                      <span className="text-wrap text-white d-flex flex-column bg-primary rounded-2 ctm-fs">
                      <i className="bi bi-geo-alt"></i>
                        Cinema</span>
                    </button>
                  </div>

                  {cinemaName ? (
                  <div className="col-auto">
                    <div className="bg-light rounded-pill px-3 py-2">
                      <span className="fw-bold">{cinemaName}<span role="button" className="bi bi-x"></span></span>
                    </div>
                  </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              
              <div className="col-lg-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <TicketsForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyTickets;

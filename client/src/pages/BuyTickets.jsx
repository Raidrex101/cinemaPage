import { useContext, useState } from "react";
import { MovieContext } from "../context/movieContext";
import { useParams } from "react-router-dom";
import TicketsForm from "../components/TicketsForm";
import TicketDates from "../components/TicketDates";
import seatIcon from "../assets/seatIcon.svg";
import food from "../assets/food.svg";

const BuyTickets = () => {
  const { movieId } = useParams()
  const { movies } = useContext(MovieContext)
  const [activeStep, setActiveStep] = useState("Schedule")
  const [cinemaName, setCinemaName] = useState("el cine placeholder")
  const [selectedDate, setSelectedDate] = useState(null)
  const movie = movies.find((movie) => movie._id === movieId)
  
  
  
  const isActive = (step) => activeStep === step;

  const availableTimes = selectedDate
   ? movie?.rooms?.flatMap(room =>
     room.functionTimes.filter(ft => ft.time.some(t => t.startsWith(selectedDate)))
     .map(ft => ({ time: ft.time, room: room.name }))
   ) : []

  return (
    <>
    {movie ? (

    <section className="position-relative vh-100 vw-100">
      <div
        className="movie-background"
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        <div className="position-absolute top-0 start-50 translate-middle mt-4 bg-transparent shadow-lg align-items-center justify-content-center text-white mt-5">
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
        <div className="bg-white p-2 rounded-5 text-center text-dark h-75 mt-5 w-100 shadow">
          <div className="container mt-4">
            <div className="row">
              <div className="col-lg-8">
                <div className="row align-items-center bg-secondary bg-opacity-25 border rounded-3">
                  <div className="col-auto ps-0">
                    <button className="btn btn-light">
                      <span className="text-wrap text-white d-flex flex-column bg-primary rounded-2 ctm-fs">
                        <i className="bi bi-geo-alt"></i>
                        Cinema
                      </span>
                    </button>
                  </div>
                  {cinemaName ? (
                    <div className="col-auto">
                      <div className="bg-light rounded-pill px-3 py-2">
                        <span className="fw-bold text-muted">
                          {cinemaName}
                          <span
                            role="button"
                            onClick={() => setCinemaName("")}
                            className="bi bi-x-lg px-2"
                          ></span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-2">
                  <TicketDates setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
                </div>
              </div>
                  
              <div className="col-lg-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                  <TicketsForm />
                  </div>
                </div>
              </div>

              {selectedDate && (
                <div className=" col-lg-8 mt-4 p-2 bg-light rounded-3">
                  <h5>Available Showtimes</h5>
                        {availableTimes.length > 0 ? (
                          availableTimes.map((schedule, index) => (
                            <div key={index} className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2">
                              <span className="fw-bold">{schedule.room}</span>
                              <div>
                                {schedule.time.map((t, idx) => (
                                  <button key={idx} className="btn btn-outline-primary mx-1">
                                    {t.split("T")[1].slice(0, 5)} {/* Extrae solo la hora */}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No available showtimes for the selected date.</p>
                        )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    ) : (
      <h2>Loading...</h2>
    )}
  </>
  );
};

export default BuyTickets;

import { useContext, useState } from "react";
import { MovieContext } from "../context/movieContext";
import { useParams } from "react-router-dom";
import TicketsForm from "../components/TicketsForm";
import TicketDates from "../components/TicketDates";
import SeatSelector from "../components/SeatSelector";

const BuyTickets = () => {
  const { movieId } = useParams();
  const { movies } = useContext(MovieContext);
  const [cinemaName, setCinemaName] = useState("el cine placeholder");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const movie = movies.find((movie) => movie._id === movieId);
  const movieFunction = movie?.rooms[0].functionTimes.find(
    (seats) => seats.time === selectedTime && seats.date === selectedDate
  );

  const availableTimes = selectedDate
    ? movie?.rooms?.flatMap((room) =>
        room.functionTimes
          .filter((ft) => ft.date === selectedDate)
          .map((ft) => ({ time: ft.time, room: room.name }))
      ) || []
    : [];

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };
  return (
    <>
      {movie ? (
        <section className="position-relative vh-100 vw-100">
          <div
            className="movie-background"
            style={{ backgroundImage: `url(${movie.poster})` }}
          ></div>

          <div className="position-relative d-flex align-items-center justify-content-center h-100 text-white">
            <div className="bg-white p-2 rounded-5 text-center text-dark h-75 mt-5 w-100 shadow">
              <div className="container mt-4">
                <div className="row align-items-start">
                  {" "}
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
                      <TicketDates
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                      />
                    </div>

                    {selectedDate && (
                      <div className="mt-2 p-2 bg-light rounded-3">
                        {" "}
                        <h5>Available Showtimes</h5>
                        <div className="d-flex align-items-center justify-content-center border-bottom -2 m-2">
                          {availableTimes.length > 0 ? (
                            availableTimes.map((schedule, index) => (
                              <button
                                key={index}
                                value={schedule.time}
                                className={`btn rounded-4 mx-2 ${
                                  selectedTime === schedule.time
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                                }`}
                                onClick={() => setSelectedTime(schedule.time)}
                              >
                                {schedule.time}
                              </button>
                            ))
                          ) : (
                            <p>No available showtimes for the selected date.</p>
                          )}
                        </div>
                      </div>
                    )}

                    {movieFunction ? (
                      <div>
                        {" "}
                        <SeatSelector
                          movieFunction={movieFunction}
                          onSeatSelect={handleSeatSelection}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="col-lg-4">
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <TicketsForm
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          selectedSeats={selectedSeats}
                          movie={movie}
                        />
                      </div>
                    </div>
                  </div>
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

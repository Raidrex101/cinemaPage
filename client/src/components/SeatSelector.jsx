import { useState } from 'react';

const SeatSelector = ({ movieFunction, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const occupiedSeats = movieFunction?.occupiedSeats ?? [];

  const seatSelection = (seat) => {
    if (occupiedSeats.includes(seat)) return;

    let updatedSeats = selectedSeats.includes(seat)
      ? selectedSeats.filter((s) => s !== seat)
      : [...selectedSeats, seat];

    setSelectedSeats(updatedSeats);
    onSeatSelect(updatedSeats);
  };

  return (
    <div className="mt-2 p-2 bg-light rounded-3">
      <h5>Available Seats</h5>
      <div className="d-flex align-items-center justify-content-center border-bottom">
        <div className="grid-container">
          {(movieFunction?.seats || []).map((seat, index) => {
            const occupied = occupiedSeats.includes(seat);
            const selected = selectedSeats.includes(seat);

            return (
              <button
                key={index}
                className={`seat-button btn ${
                  occupied
                    ? "btn-secondary"
                    : selected
                    ? "btn-warning"
                    : "btn-outline-primary"
                }`}
                onClick={() => !occupied && seatSelection(seat)}
                disabled={occupied}
              >
                {occupied ? <i className="bi bi-person-fill"></i> : seat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;

import { useAuthContext } from "../hooks/useAuth";
import FoodModal from "./FoodModal";

const TicketsForm = ({ movie, selectedDate, selectedTime, selectedSeats, onSubmit }) => {
  const { userPayload } = useAuthContext();
  
  const customerId = userPayload._id;
  const movieId = movie?._id;
  const room = movie?.rooms.find((room) =>
    room.functionTimes.some(
      (func) => func.date === selectedDate && func.time === selectedTime && func.movie === movieId
    )
  )
  const roomId = room ? room._id : null;

  const quantity = selectedSeats.length;
  const seatPrice = movie.seatPrice;
  const totalValue = seatPrice * quantity;

  
    const ticketData = {
      customerId,
      movieId,
      roomId,
      quantity,
      seatPrice,
      totalValue,
      functionDate: selectedDate,
      functionTime: selectedTime,
      seats: selectedSeats,
    }

  return (
    <form className="d-flex flex-column gap-1" style={{ height: "38rem" }}>
      <h4>Confirm your purchase</h4>

      <div className="fw-bold">
        <label>Movie:</label>
        <input
        className="form-control text-center"
        type="text"
        value={movie?.name}
        disabled
        />
        
      </div>

      <div className="fw-bold">
        <label >Date:</label>
        <input
        className="form-control text-center"
        type="text"
        value={selectedDate}
        disabled />
      </div>

      <div className="fw-bold">
        <label>Time:</label>
        <input
        className="form-control text-center"
        type="text"
        value={selectedTime}
        disabled />
      </div>

      <div className="fw-bold">
        <label>Room:</label>
        <input
        className="form-control text-center"
        type="text"
        value={room?.name}
        disabled />
      </div>

      <div className="fw-bold">
        <label>Seats:</label>
        <input
        className="form-control text-center"
        type="text"
        value={selectedSeats}
        disabled />
      </div>

      <div>
        <label>Quantity:</label>
        <input
        className="form-control text-center"
        type="number"
        value={quantity || []}
        disabled />
      </div>

      <div className="fw-bold">
        <label>Price per seat:</label>
        <input
        className="form-control text-center"
        type="text"
        value={`$${seatPrice}`}
        disabled />
      </div>

      <div className="fw-bold">
        <label>Total:</label>
        <input
        className="form-control text-center"
        type="text"
        value={`${totalValue ? `$${totalValue}` : " "}`}disabled />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#paymentModal"
        >Proceed
        </button>
        <FoodModal />
    </form>
  );
};

export default TicketsForm;

import { useAuthContext } from "../hooks/useAuth";
import { generateDates } from "../utils/dateUtils";

const TicketDates = ({ setSelectedDate, selectedDate }) => {
  const { userPayload } = useAuthContext()
  const customerId = userPayload?._id
  const dates = generateDates()

  return (
    <div className="d-flex justify-content-evenly rounded-3 p-3 ">
      {dates.map((date, index) => (
        <button
          key={index}
          className={`btn ${selectedDate === date.iso ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelectedDate(date.iso)}
          disabled={!customerId}
        >
          <span className="d-block fw-bold text-muted">{date.day}</span>
          <span className="d-block fw-bold fs-5">{date.short}</span>
        </button>
      ))}
    </div>
  );
};

export default TicketDates;

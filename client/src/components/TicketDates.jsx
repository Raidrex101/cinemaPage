import { useAuthContext } from "../hooks/useAuth";
const TicketDates = ({ setSelectedDate, selectedDate }) => {
  const { userPayload } = useAuthContext();
  const customerId = userPayload?._id
  const today = new Date();
  const dates = []
  
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today)
    
    currentDate.setDate(today.getDate() + i);
    const formattedDate = currentDate.toLocaleString().split(",")[0]

    dates.push({
      day: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
      date: currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      formattedDate,
    });
  }

  return (
    <div className="d-flex justify-content-evenly rounded-3 p-3 ">
      {dates.map((date, index) => (
        <button
          key={index}
          className={`btn ${selectedDate === date.formattedDate ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelectedDate(date.formattedDate)}
          disabled={!customerId}
        >
          <span className="d-block fw-bold text-muted">{date.day}</span>
          <span className="d-block fw-bold fs-5">{date.date}</span>
        </button>
      ))}
    </div>
  );
};

export default TicketDates;

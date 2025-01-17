const TicketDates = () => {
  const today = new Date()
  const dates = []

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today)
    currentDate.setDate(today.getDate() + i)
    dates.push({
      day: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }

  return (
    <div className="d-flex justify-content-around bg-light rounded-3 p-3">
      {dates.map((date, index) => (
        <div key={index} className="text-center">
          <span className="d-block fw-bold text-muted">{date.day}</span>
          <span className="d-block fw-bold fs-5">{date.date}</span>
        </div>
      ))}
    </div>
  );
};

export default TicketDates;

export const generateDates = (days = 7) => {
    const today = new Date()
    const dates = []
  
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i);
      const formattedDate = currentDate.toLocaleString().split(",")[0]
  
      dates.push({
        formattedDate,
      });
    }
  
    return dates;
  };
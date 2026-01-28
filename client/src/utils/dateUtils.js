export const generateDates = (days = 7) => {
  const today = new Date()
  const dates = []

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(today)
    currentDate.setDate(today.getDate() + i)

    const formattedDate = currentDate.toLocaleString().split(',')[0]
    const iso = currentDate.toISOString().split('T')[0] // YYYY-MM-DD
    const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' })
    const short = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    dates.push({ formattedDate, iso, day, short })
  }

  return dates
}
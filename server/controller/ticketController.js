import Ticket from '../models/ticketModel.js'
import Room from '../models/roomModel.js'

// CREATE
const createTicket = async (req, res) => {
  try {
    const { customerId, movieId, roomId, quantity, seatPrice, totalValue, functionDate, functionTime, seats, food } = req.body

    const room = await Room.findById(roomId)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    // Normalize incoming functionDate and stored functionTimes.date to ISO (YYYY-MM-DD)
    const normalizeToISODate = (date) => {
      if (!date) return null
      if (date instanceof Date) return date.toISOString().split('T')[0]
      if (typeof date !== 'string') return null
      // already ISO
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date
      // common slash formats like D/M/YYYY or M/D/YYYY
      const slashMatch = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
      if (slashMatch) {
        const a = parseInt(slashMatch[1], 10)
        const b = parseInt(slashMatch[2], 10)
        const y = parseInt(slashMatch[3], 10)
        // if first part > 12 assume day-first (D/M/YYYY)
        let day, month
        if (a > 12) {
          day = a
          month = b
        } else {
          // prefer day-first if day <= 31 and month <=12 but many locales use day-first
          // choose month=b, day=a (M/D/YYYY) only if a <= 12 and b > 12 (rare)
          if (b > 12) {
            day = a
            month = b
          } else {
            // default to day-first
            day = a
            month = b
          }
        }
        const dt = new Date(y, month - 1, day)
        if (!isNaN(dt)) return dt.toISOString().split('T')[0]
        return null
      }
      // fallback: attempt Date.parse
      const parsed = new Date(date)
      if (!isNaN(parsed)) return parsed.toISOString().split('T')[0]
      return null
    }

    const incomingISO = normalizeToISODate(functionDate)

    const functionTimeEntry = room.functionTimes.find((func) => {
      const storedISO = normalizeToISODate(func.date)
      return storedISO === incomingISO && func.time === functionTime && func.movie.toString() === movieId
    })

    if (!functionTimeEntry) {
      return res.status(404).json({ message: 'Function time not found in this room' })
    }

    const occupiedSeatsArr = functionTimeEntry.occupiedSeats || functionTimeEntry.ocupiedSeats || []

    const alreadyOccupied = seats.some((seat) => occupiedSeatsArr.includes(seat))
    if (alreadyOccupied) {
      return res.status(400).json({ message: 'One or more selected seats are already occupied' })
    }

    functionTimeEntry.seats = (functionTimeEntry.seats || []).filter((seat) => !seats.includes(seat))

    // ensure occupiedSeats exists on the subdocument and push
    if (!functionTimeEntry.occupiedSeats) functionTimeEntry.occupiedSeats = occupiedSeatsArr
    functionTimeEntry.occupiedSeats.push(...seats)

    await room.save()

    const newTicket = new Ticket({
      customerId,
      movieId,
      roomId,
      functionDate,
      functionTime,
      seats,
      quantity,
      seatPrice,
      totalValue,
      food
    })

    await newTicket.save()

    res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error })
  }
}

const getMyTickets = async (req, res) => {
  const { customerId } = req.params

  if (customerId !== req.userId) {
    return res.status(403).json({ message: 'Forbidden' })
  }
  try {
    const myTickets = await Ticket
      .find({ customerId })
      .populate('customerId', 'firstName lastName')
      .populate('movieId', 'name poster')
      .populate('roomId', 'name')
      .populate('functionDate')
      .populate('food', 'name quantity')
      .select('quantity seats functionTime totalValue createdAt')
    return res.status(200).json(myTickets)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export {
  createTicket,
  getMyTickets
}

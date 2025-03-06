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

    const functionTimeEntry = room.functionTimes.find(
      (func) => func.date === functionDate && func.time === functionTime && func.movie.toString() === movieId
    )

    if (!functionTimeEntry) {
      return res.status(404).json({ message: 'Function time not found in this room' })
    }

    const alreadyOccupied = seats.some((seat) => functionTimeEntry.occupiedSeats.includes(seat))
    if (alreadyOccupied) {
      return res.status(400).json({ message: 'One or more selected seats are already occupied' })
    }

    functionTimeEntry.seats = functionTimeEntry.seats.filter((seat) => !seats.includes(seat))

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

import Ticket from '../models/ticketModel.js'
import Room from '../models/roomModel.js'
import Movie from '../models/movieModel.js'

// CREATE
const createTicket = async (req, res) => {
  const { quantity, seats, functionTime } = req.body
  const { customerId, movieId, roomId } = req.params

  try {
    // the movie exists?
    const movie = await Movie.findById(movieId)
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    // the room exists?
    const room = await Room.findById(roomId)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }
    // finding the speciffic function time for the movie
    const functionData = room.functionTimes.find(ft => ft.time === functionTime)
    if (!functionData) {
      return res.status(404).json({ message: 'Function time not found' })
    }
    // the seats are available?
    if (!seats.every(seat =>
      room.seats.includes(seat) &&
      !functionData.occupiedSeats.includes(seat)
    )) {
      return res.status(400).json({ message: 'Some seats are not available' })
    }

    const occupiedSeats = functionData.occupiedSeats || []
    const availableSeats = room.seats.filter(seat => !occupiedSeats.includes(seat)) // filtering theroom.seats that are not in the occupiedSeats

    // the quantity does not exceed the room capacity?
    if (quantity > availableSeats.length) {
      return res.status(400).json({ message: 'Not enough seats aviable' })
    }
    // calculate the total price of the ticket
    const seatPrice = movie.seatPrice
    const totalValue = seatPrice * quantity
    // creating the new ticket
    const newTicket = await Ticket.create({
      customerId,
      movieId,
      roomId,
      quantity,
      seatPrice,
      totalValue,
      seats,
      functionTime
    })
    // updating the occupied seats in the specific function time
    functionData.occupiedSeats.push(...seats)
    await room.save()

    res.status(201).json(newTicket)
  } catch (error) {
    res.status(400).json({ message: error.message })
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
      .populate('movieId', 'name')
      .populate('roomId', 'name')
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

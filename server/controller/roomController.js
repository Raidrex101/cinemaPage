import Movie from '../models/movieModel.js'
import Room from '../models/roomModel.js'

// CREATE
const createRoom = async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'Room name is required' })
  }

  try {
    const newRoom = await Room.create({ name })
    res.status(201).json(newRoom)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room
      .find({})
      .populate({
        path: 'functionTimes.movie',
        select: 'name seatPrice -_id'
      })
    res.status(200).json(rooms)
  } catch (error) {
    res.status(500).json({ message: 'Error getting rooms', error })
  }
}

// UPDATE

const addFunctionTime = async (req, res) => {
  try {
    const { roomId, functionTime } = req.body

    if (!roomId || !functionTime) {
      return res.status(400).json({ message: 'Missing roomId or functionTime' })
    }

    const { movie, seats, occupiedSeats, time, date } = functionTime

    if (!movie || !time || !seats || !date) {
      return res.status(400).json({ message: 'Incomplete functionTime data' })
    }

    const room = await Room.findById(roomId)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    const existingFunction = room.functionTimes.find(
      (ft) => ft.time === time && ft.movie.toString() === movie.toString() && ft.date === date
    )

    if (existingFunction) {
      return res
        .status(400)
        .json({ message: `Function time ${time} with this movie already exists` })
    }

    room.functionTimes.push({
      time,
      date,
      movie,
      seats,
      occupiedSeats
    })

    await room.save()

    const movieData = await Movie.findById(movie)
    if (!movieData) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    if (!movieData.rooms.map((id) => id.toString()).includes(roomId.toString())) {
      movieData.rooms.push(roomId)
      await movieData.save()
    }

    return res.status(200).json({ message: 'Function time added successfully', room })
  } catch (error) {
    console.error('Error adding function time:', error)
    return res.status(500).json({ message: 'Error adding function time', error: error.message })
  }
}

const manageIsActive = async (req, res) => {
  try {
    const room = await Room.findById(req.body.roomId)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    if (room.isActive) {
      const hasOccupiedSeats = room.functionTimes.some(ft => (ft.occupiedSeats || ft.ocupiedSeats || []).length > 0)
      if (hasOccupiedSeats) {
        return res.status(400).json({ message: 'Cannot deactivate a room with occupied seats' })
      }

      room.isActive = false

      await Movie.updateMany(
        { rooms: room._id },
        { $pull: { rooms: room._id } }
      )

      room.functionTimes = []
    } else {
      room.isActive = true
    }

    await room.save()
    res.status(200).json({ message: 'Room status updated successfully', isActive: room.isActive })
  } catch (error) {
    console.error('Error changing room status:', error)
    res.status(500).json({ message: 'Error updating room status', error })
  }
}

export {
  createRoom,
  getAllRooms,
  addFunctionTime,
  manageIsActive
}

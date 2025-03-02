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
        select: 'name poster seatPrice'
      })
    res.status(200).json(rooms)
  } catch (error) {
    res.status(500).json({ message: 'Error getting rooms', error })
  }
}

// UPDATE

const addFunctionTime = async (req, res) => {
  try {
    const { roomId, time, movieId } = req.body
    const room = await Room.findById(roomId)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    const existingFunction = room.functionTimes.find(ft => ft.time === time)
    if (existingFunction) {
      return res.status(400).json({ message: 'Function time already exists' })
    }

    room.functionTimes.push({
      time,
      movie: movieId
    })

    await room.save()

    const movie = await Movie.findById(movieId)
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    if (!movie.rooms.includes(roomId)) {
      movie.rooms.push(roomId)
      await movie.save()
    }

    res.status(200).json({ message: 'Function time added successfully', room })
  } catch (error) {
    res.status(500).json({ message: 'Error adding function time', error })
  }
}

const manageIsActive = async (req, res) => {
  try {
    const room = await Room.findById(req.body.roomId)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    if (room.isActive) {
      if (room.seats < 40) {
        return res.status(400).json({ message: 'Some seats are bought, you cannot deactivate the room' })
      }
      room.isActive = false
      room.functionTimes = []

      await Movie.updateMany(
        { rooms: room._id },
        { $pull: { rooms: room._id } }
      )
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

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
      .find({ isActive: true })
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
    res.status(200).json({ message: 'Function time added successfully', room })
  } catch (error) {
    res.status(500).json({ message: 'Error adding function time', error })
  }
}

export {
  createRoom,
  getAllRooms,
  addFunctionTime
}

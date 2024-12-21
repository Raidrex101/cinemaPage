import Room from '../models/roomModel.js'

// CREATE
const createRoom = async (req, res) => {
  const { name } = req.body
  try {
    const newRoom = await Room.create({ name })
    res.status(201).json(newRoom)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export { createRoom }

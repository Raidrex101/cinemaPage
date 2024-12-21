import mongoose from 'mongoose'

const seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10']

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  seats: {
    type: [String],
    default: () => seats
  },
  occupiedSeats: {
    type: [String], default: []
  },
  functionTimes: [{
    time: { type: String },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    occupiedSeats: { type: [String], default: [] }
  }
  ]
})

const Room = mongoose.model('Room', roomSchema)

export default Room

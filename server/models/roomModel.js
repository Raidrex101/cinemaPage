import mongoose from 'mongoose'

const functionTimeSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  seats: {
    type: [String],
    default: []
  },
  occupiedSeats: {
    type: [String],
    default: []
  }
}, { _id: false })

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  functionTimes: [functionTimeSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false })

const Room = mongoose.model('Room', roomSchema)

export default Room

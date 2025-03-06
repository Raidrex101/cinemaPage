import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  seatPrice: {
    type: Number,
    required: true
  },
  totalValue: {
    type: Number,
    required: true
  },
  functionDate: {
    type: Date,
    required: true
  },
  functionTime: {
    type: String,
    required: true
  },
  seats: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.every(seat => /^[A-H]([1-9]|10)$/.test(seat))
      },
      message: props => `One or more seats that you requested: ${props.value.join(', ')} are not valid. Please use A1 to H10.`
    }
  },
  food: {
    type: [String],
    default: []
  }
}, { timestamps: true, versionKey: false })

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket

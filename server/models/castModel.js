import mongoose from 'mongoose'

const castSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  tmdbId: {
    type: Number,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false })

const Cast = mongoose.model('Cast', castSchema)

export default Cast

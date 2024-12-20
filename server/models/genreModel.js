import mongoose from 'mongoose'

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tmdbId: {
    type: Number,
    required: true,
    unique: true
  }
})

const Genre = mongoose.model('Genre', genreSchema)

export default Genre
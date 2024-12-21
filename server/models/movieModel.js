import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  genre: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true
  }],
  releaseDate: {
    type: Date,
    required: true
  },
  director: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Directors', required: true
  }],
  cast: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Cast', required: true
  }],
  durationMins: {
    type: Number,
    required: true
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Room'
  }],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  overview: {
    type: String
  },
  poster: {
    type: String
  },
  seatPrice: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true, versionKey: false })

const Movie = mongoose.model('Movie', movieSchema)

export default Movie

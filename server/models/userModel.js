import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    default: undefined
  },
  role: {
    type: String,
    enum: ['ADMIN', 'EMPLOYEE', 'CUSTOMER'],
    default: 'CUSTOMER'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false })

const User = mongoose.model('User', userSchema)

export default User

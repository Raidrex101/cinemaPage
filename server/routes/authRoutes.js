import express from 'express'
import { register, login } from '../controller/authcontroller.js'

const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)

export default authRoutes

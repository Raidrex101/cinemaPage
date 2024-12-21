import express from 'express'
import { createRoom } from '../controller/roomController.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isAuth } from '../middlewares/isAuth.js'

const roomRoutes = express.Router()

roomRoutes.post('/', isAuth, isAdmin, createRoom)

export default roomRoutes

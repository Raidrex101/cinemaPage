import express from 'express'
import { createRoom, addFunctionTime, getAllRooms } from '../controller/roomController.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isAuth } from '../middlewares/isAuth.js'

const roomRoutes = express.Router()

roomRoutes.post('/', isAuth, isAdmin, createRoom)
roomRoutes.get('/', getAllRooms)
roomRoutes.patch('/:roomId', isAuth, isAdmin, addFunctionTime)

export default roomRoutes

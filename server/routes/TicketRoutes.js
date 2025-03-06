import express from 'express'
import { createTicket, getMyTickets } from '../controller/ticketController.js'
import { isAuth } from '../middlewares/isAuth.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/createTicket', isAuth, createTicket)
ticketRoutes.get('/my-tickets/:customerId', isAuth, getMyTickets)

export default ticketRoutes

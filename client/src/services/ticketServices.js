import axios from 'axios'

const mainUrl = import.meta.env.VITE_CINEMA_API

const createTicket = (ticketData, token) => {    
    return axios.post(`${mainUrl}/tickets/createTicket`, ticketData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })}

const getMyTickets = (customerId, token ) => {
    return axios.get(`${mainUrl}/tickets/my-tickets/${customerId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export {
    createTicket,
    getMyTickets
}
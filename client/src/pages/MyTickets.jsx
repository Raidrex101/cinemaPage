import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMyTickets } from '../services/ticketServices'
import { QRCodeSVG } from 'qrcode.react'

const MyTickets = () => {
  const { userId } = useParams()
  const [tickets, setTickets] = useState([])
  console.log('tickets',tickets);
  

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!userId || !token) return

    getMyTickets(userId, token)
      .then(response => setTickets(response.data))
      .catch(error => console.error('Error al obtener tickets:', error))
  }, [userId, token])

  return (
    <div className=" vw-100">
      <h2 className="text-center">My Tickets</h2>
      
      {tickets.length === 0 ? (
        <p className=" text-center">No tickets have been bought</p>
      ) : (
        <div className="row row-cols-1 row-cols-2 row-cols-3 justify-content-center g-4 ps-5 me-2 ">
          {tickets.map(ticket => (
            <div key={ticket._id} className="col">
            <div
              className="card card-cover h-100 overflow-hidden rounded-4 shadow-lg pt-5 pb-2"
              style={{ 
                backgroundImage: `url(${ticket.movieId.poster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'}}
            >
              <div className="d-flex flex-column h-100 p-4 pb-1 text-white text-shadow-1">
                <h3 className=" mt-5 mb-5 display-6 fw-bold text-center bg-primary bg-opacity-10 rounded-2">
                  {ticket.movieId.name}
                </h3>
                <ul className="d-flex list-unstyled mt-auto me-4">
                  <li className="me-auto mt-5">
                  <QRCodeSVG
                        value={JSON.stringify({
                          name: ticket.movieId.name,
                          movieId: ticket.movieId._id,
                          date: ticket.date,
                          time: ticket.functionTime,
                          ticketId: ticket._id,
                          seats: ticket.seats,
                          food: ticket.food.map(item => `${item.name} (${item.quantity})`).join(', ')
                        })}
                        size={120}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        qrStyle="dots"
                        eyeRadius={10}
                      />
                  </li>
                  <li className="d-flex align-items-center">
                    <small className='border border-primary border-2 bg-primary rounded mt-5'>{ticket.functionDate.split('T')[0]}</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <small className='border border-primary border-2 bg-primary rounded mt-5 ms-1'>{ticket.functionTime}</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyTickets

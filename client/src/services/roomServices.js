import axios from 'axios'

const mainUrl = import.meta.env.VITE_CINEMA_API

const createRoom = (roomData, token) => {
    
    return axios.post(`${mainUrl}/rooms`, roomData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })}

const editRoom = (roomData, token) => {

    return axios.post(`${mainUrl}/rooms/functionTime`, roomData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const isActiveControl = (roomId, token) => {
    
    return axios.patch(`${mainUrl}/rooms/isActive`, { roomId: roomId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

export {
    createRoom,
    editRoom,
    isActiveControl
}
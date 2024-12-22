import axios from 'axios'

const mainUrl = import.meta.env.VITE_CINEMA_API

const userLogin = (loginData) => axios.post(`${mainUrl}/login`, loginData)

const userRegister = (registerData) => axios.post(`${mainUrl}/register`, registerData)

export {
    userLogin,
    userRegister
}
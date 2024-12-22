import { jwtDecode } from 'jwt-decode'
import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [autenticated, setAutenticated] = useState(false)
    const [userPayload, setUserPayload] = useState(null)

    const login = (token) => {
        localStorage.setItem('token', token)
        const payload = jwtDecode(token)
        setAutenticated(true)
        setUserPayload(payload)
    }

    const logout = () =>  {
        localStorage.removeItem('token')
        setAutenticated(false)
        setUserPayload(null)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const payload = jwtDecode(token)
            setAutenticated(true)
            setUserPayload(payload)
        }
    }, [])

    const data = {
        autenticated,
        userPayload,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
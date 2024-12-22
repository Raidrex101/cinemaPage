import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext debe ser usado dentro de AuthProvider')
    }
    return context
}
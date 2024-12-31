import { createContext, useState, useEffect } from 'react'

const MovieContext = createContext()

const MovieProvider = ({ children }) => {
    const mainUrl = import.meta.env.VITE_CINEMA_API
    
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${mainUrl}/movies`)
                
                if (!response.ok) {
                    throw new Error(`Error fetching movies: ${response.status} ${response.statusText}`)
                }
                const data = await response.json()
                console.log('Movies data:', data)
                setMovies(data)
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }
        fetchMovies()
    }, [mainUrl])

    const data = {
        movies
    }
    
    return (
        <MovieContext.Provider value={data}>
            {children}
        </MovieContext.Provider>
    )
}

export { MovieContext, MovieProvider }

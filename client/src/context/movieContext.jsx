import { createContext, useState, useEffect, useCallback } from 'react'

const MovieContext = createContext()

const MovieProvider = ({ children }) => {
    const mainUrl = import.meta.env.VITE_CINEMA_API
    
    const [movies, setMovies] = useState([])

    const fetchMovies = useCallback(async () => {
        try {
            const response = await fetch(`${mainUrl}/movies`)

            if (!response.ok) {
                throw new Error(`Error fetching movies: ${response.status} ${response.statusText}`)
            }
            const data = await response.json()
            setMovies(data)
        } catch (error) {
            console.error('Error fetching movies:', error)
        }
    }, [mainUrl])

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies])

    const data = {
        movies,
        refreshMovies: fetchMovies
    }
    
    return (
        <MovieContext.Provider value={data}>
            {children}
        </MovieContext.Provider>
    )
}

export { MovieContext, MovieProvider }

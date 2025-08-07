import React from 'react'
import Search from './components/search'
import { useEffect, useState } from 'react'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import {useDebounce} from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite'

const API_BASE_URL ='https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}` 
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('')
  const [trendingMovies, setTrendindMovies] = useState([])
  const [errorMessageTrending, setErrorMessageTrending] = useState('')
  const [isloadingTrending, setloadingTrending] = useState(false)

  useDebounce(()=> setDebounceSearchTerm(searchTerm), 700, [searchTerm])

  const fetchMovies = async (query='') =>{
    setisLoading(true)
    setErrorMessage('')

    try {
      const enpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc` 

      const response = await fetch(enpoint, API_OPTIONS)

      if (!response.ok){
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()
      console.log(data)

      if (data.response == 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies'); 
        setMovieList([])
        return
      }

      setMovieList(data.results || [])

      if(query && data.results.length > 0 ){
        await updateSearchCount(query, data.results[0])
      }

    } catch (error) {

      console.error(`Error Fetching movies: ${error}`)
      setErrorMessage('Error fetching movies. Please try again later. ')
    } finally {
      setisLoading(false)
    }
 }

 const loadTrendingMovies = async () =>{
  setloadingTrending(true)
  setErrorMessageTrending('')
  try {
    const movies = await getTrendingMovies()
    setTrendindMovies(movies)
    
  } catch (error) {
    console.error(`Error Fetching trending movies: ${error}`)
    setErrorMessageTrending('Error fetching Trending movies. Please try again later.')
  }finally {
      setloadingTrending(false)
    }
 }

  useEffect(()=>{
    fetchMovies(debounceSearchTerm)
  },[debounceSearchTerm])

  useEffect(()=>{
    loadTrendingMovies()
  },[])

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
          <header>
            <img src="hero-img.png" alt="Hero Banner" />
            <h1> Find <span className='text-gradient'>Movies</span> You'll Wnjoy Without the hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies.length > 0 && (
            <section className='trending'>
              <h2>Trending Movies</h2>

                {isloadingTrending ? (
                  <div className='p-12'>
                    <Spinner />
                  </div> 
                ) : errorMessageTrending ? (
                  <p className='text-red-500'>{errorMessage}</p> 
                ) : (
                  <ul>
                    {trendingMovies.map((movie, index) => (
                      <li key={movie.$id}>
                        <p>{index + 1}</p>
                        <img src={movie.poster_url} alt={movie.title} />
                      </li>
                    ))}
                  </ul>
                )}
            </section>
          )}

          <section className='all-movies'>
            <h2>Popular</h2>

            {isLoading ? (
              <Spinner />
            ): errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )}
          </section>
      </div>
    </main>
  )
}

export default App
import css from './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import fetchMovies from '../services/movieService';
import type { Movie } from '../../types/movie';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

 function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(false);
   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
   
   const handleSelectedMovie = (movie: Movie) => {
     setSelectedMovie(movie);
   }
   const handleClose = () => {
     setSelectedMovie(null);
}
  const handleSearchMovie = async (query: string) => {
    setIsLoader(true);
    setError(false);
    setMovies([]);
    try {
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error('No movies found for your request.')
      } else {
        setMovies(data);
      }
    } catch {
      toast.error('привет я ошибка во время запроса. А ты в природе.');
      setError(true);
    } finally {
      setIsLoader(false);
    }
  }



  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={true} />
      <SearchBar onSubmit={handleSearchMovie} />
      {isLoader && <Loader />}
      {error && <ErrorMessage/>}
      {movies.length > 0 && (<MovieGrid onSelect={handleSelectedMovie} movies={movies} />)}
      { selectedMovie && (<MovieModal movie={selectedMovie} onClose={handleClose}/>)}
    </div>
  )
}
export default App

import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import filterMovies from '../../utils/functions';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ savedMovies, onDeleteMovie, savedMoviesIds, isDataLoading }) => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [shortFilteredMovies, setShortFilterseMovies] = useState([]);
    const [checkBoxChecked, setIsCheckboxChecked] = useState(false);

    useEffect(() => {
        setFilteredMovies([...savedMovies])
    }, [savedMovies])

    const handleDeleteMovie = (movie) => {
        onDeleteMovie(movie);
    }

    useEffect(() => {
        if (localStorage.getItem('filteredMovies')) {
            const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
            setShortFilterseMovies(filteredMovies.filter((item) => item.duration <= 40));
        }
    }, [])
    const handleSearch = (message) => {
        const result = filterMovies(savedMovies, message)
        setFilteredMovies(result);
        const resultShort1 = result.filter((item) => item.duration <= 40);
        setShortFilterseMovies(resultShort1);
    }
    console.log(shortFilteredMovies)

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!checkBoxChecked)
    }
  

    return (
        <section className='movies saved-movies'>
            <div className='movies__content'>
                <SearchForm checkBoxChecked={checkBoxChecked} onCheckboxChange={handleCheckboxChange} onSearchSubmit={handleSearch} />
                {isDataLoading ?
                    <Preloader />
                    :
                    <>
                        {checkBoxChecked ?
                            <>{(shortFilteredMovies.length === 0) && <span className='movies__not-found'>Ничего не найдено</span>}</>
                            :
                            <>{(filteredMovies.length === 0) && <span className='movies__not-found'>Ничего не найдено</span>}</>
                        }
                        <MoviesCardList>
                            
                            {checkBoxChecked ?
                                <>
                                    {filteredMovies.filter((item) => item.duration <= 40).map((piece) => (
                                <MoviesCard card={piece} {...piece} key={piece._id} handleDeleteMovie={handleDeleteMovie} savedMoviesIds={savedMoviesIds} />
                            ))}
                                </>
                                :
                                <>
                                    {filteredMovies.map((item) => (
                                <MoviesCard card={item} {...item} key={item._id} handleDeleteMovie={handleDeleteMovie} savedMoviesIds={savedMoviesIds} />
                            ))}
                                </>}
                        </MoviesCardList>
                    </>
                }
            </div>
        </section>
    )
}


export default SavedMovies;

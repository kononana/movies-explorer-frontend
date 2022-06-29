import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import filterMovies from '../../utils/utils';
import Preloader from '../Preloader/Preloader';


function Movies({ movies, onSearchSubmit, CardsToRender, numberOfCardsToAdd, onSaveMovie, savedMoviesIds,
    onDislikeMovie, isDataLoading, isPopupOpened, onClosePopup, isSuccsesful }) {

    const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
    const [shortFilteredMovies, setShortFilterseMovies] = useState(JSON.parse(localStorage.getItem('shortFilteredMovies')) || []);
    const [checkBoxChecked, setIsCheckboxChecked] = useState(false);
    const [cardsToRender, setCardsToRender] = useState(CardsToRender);
    const [isSearchDone, setSearchDone] = useState(false);

   
    useEffect(() => {
        if (localStorage.getItem('filteredMovies')) {
            const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
            setShortFilterseMovies(filteredMovies.filter((item) => item.duration <= 40));
        }
    }, [])

    function changeCheckbox(value) {
        setIsCheckboxChecked(value)
        localStorage.setItem('checkboxStatus', JSON.stringify(!checkBoxChecked))
        setSearchDone(true)
      }

    // const handleCheckboxChange = () => {
    //     setIsCheckboxChecked(!checkBoxChecked);
    //     setSearchDone(true);
    // }

    const getLoadFromLocalstorage = (message) => {
        filterMovies(movies, message)
    }
    const handleSearch = (message) => {
        setCardsToRender(CardsToRender);
        onSearchSubmit((movies) => {
            const result = filterMovies(movies, message)
            setFilteredMovies(result);
            const resultShort = result.filter((item) => item.duration <= 40);
            setShortFilterseMovies(resultShort);
            if (checkBoxChecked) {
                localStorage.setItem('shortFilteredMovies', JSON.stringify(resultShort));
                localStorage.removeItem('filteredMovies'); 
            } else {
                localStorage.setItem('filteredMovies', JSON.stringify(result));
                localStorage.removeItem('shortFilteredMovies');
            }
            localStorage.setItem('checkboxStatus', JSON.stringify(checkBoxChecked));
            
        });
       
        setSearchDone(true);
    }

    const handleLikeMovie = (card) => {
        onSaveMovie(card)
    }
    
    const addMoviesOnClick = () => {
        setCardsToRender(cardsToRender + numberOfCardsToAdd)
    }

    return (
        <>
            <section className='movies'>
                <div className='movies__content'>
                    <SearchForm checkBoxChecked={checkBoxChecked} changeCheckbox={changeCheckbox}
                        onSearchSubmit={handleSearch} getLoadFromLocalstorage={getLoadFromLocalstorage} />
                    {isDataLoading ?
                        <Preloader />
                        :
                        <>
                            {checkBoxChecked ?
                                <>{(isSearchDone && shortFilteredMovies.length === 0) && <span className='movies__not-found'>Ничего не найдено</span>}</>
                                :
                                <>{(isSearchDone && filteredMovies.length === 0) && <span className='movies__not-found'>Ничего не найдено</span>}</>
                            }
                            <MoviesCardList>
                                {checkBoxChecked ?
                                    <>
                                        {shortFilteredMovies.slice(0, cardsToRender).map((item) => (
                                            <MoviesCard card={item} {...item} key={item.id} handleLikeMovie={handleLikeMovie} savedMoviesIds={savedMoviesIds}
                                                onDislikeMovie={onDislikeMovie} />
                                        ))}
                                    </>
                                    :
                                    <>
                                        {filteredMovies.slice(0, cardsToRender).map((item) => (
                                            <MoviesCard card={item} {...item} key={item.id} handleLikeMovie={handleLikeMovie} savedMoviesIds={savedMoviesIds}
                                                onDislikeMovie={onDislikeMovie} />
                                        ))}
                                    </>}

                            </MoviesCardList>

                            {checkBoxChecked ?
                                <>
                                    {shortFilteredMovies.length > shortFilteredMovies.slice(0, CardsToRender).length && shortFilteredMovies.length > cardsToRender ?
                                        <div className='more-btn-container'>
                                            <button className='more-btn' onClick={addMoviesOnClick}>Ещё</button>
                                        </div>
                                        :
                                        null}
                                </>
                                :
                                <>
                                    {filteredMovies.length > filteredMovies.slice(0, CardsToRender).length && filteredMovies.length > cardsToRender ?
                                        <div className='more-btn-container'>
                                            <button className='more-btn' onClick={addMoviesOnClick}>Ещё</button>
                                        </div>
                                        :
                                        null}
                                </>}
                        </>
                    }

                </div>
            </section>
            
        </>
    )
}

export default Movies;
import '../../vendor/normalize.css';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { useState, useEffect, useMemo } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
// import Navigation from '../Navigation/Navigation';

function App() {
 const headerRoutes = ['/', '/profile', '/movies', '/saved-movies'];
  const footerRoutes = ['/', '/movies', '/saved-movies'];
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [CardsToRender, setCardsToRender] = useState(0);
  const [numberOfCardsToAdd, setNumberOfCardsToAdd] = useState(0);

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isSuccsesful, setIsRequestOk] = useState(false);
  const [isPopupOpened, setIsInfoTooltipOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      mainApi.tokenCheck()
        .then(() => {
          setIsLoggedIn(true);
          setIsUserChecked(true);
        })
        .catch(err => {
          console.log(err);
          localStorage.removeItem('token');
        })
    } else {
      setIsUserChecked(true);
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    Promise.all([mainApi.getUserData(), mainApi.getSavedMovies()])
      .then(([user, movies]) => {
        setCurrentUser(user);
        console.log('current user:', user)
        setSavedMovies(movies.filter((item) => item.owner === user._id));
        setSavedMoviesIds(movies.filter((item) => item.owner === user._id).map(item => item.movieId));
        console.log('saved movies', movies.filter((item) => item.owner === user._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }, [isLoggedIn])

  // authorization

  const handlePopupOpen = () => {
    setIsInfoTooltipOpen(false);
    setIsRequestOk(false);
  }
  const handleRegisterSubmit = ({ name, password, email }) => {
    mainApi.register({ name, password, email })
      .then(() => {
        handleLoginSubmit({ password: password, email: email });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
      })
  }

  const handleLoginSubmit = ({ password, email }) => {
    mainApi.login({ password, email })
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  const handleExit = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.clear();
    setCurrentUser({});
  }

  const handleUpdateUserInfo = ({ name, email }) => {
    mainApi.editUserData({ name, email })
      .then((res) => {
        setIsRequestOk(!isSuccsesful);
        setIsInfoTooltipOpen(true);
        setCurrentUser(res);

      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }
 
//search movies
const getMovies = (filteredAnswer) => {
  setIsDataLoading(true);
  return moviesApi.getMovies()
    .then((res) => {
      setMovies(res);
      filteredAnswer(res);
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltipOpen(true);
    })
    .finally(() => {
      setIsDataLoading(false)
    })
}

const handleMoviesSearchSumit = (filteredAnswer) => {
  getMovies(filteredAnswer);
}

// save movies 
const handleSaveMovies = (movie) => {
  return mainApi.addMovieToSaved(movie)
    .then((newMovie) => {
      setSavedMovies([newMovie, ...savedMovies]);
      setSavedMoviesIds([newMovie.movieId, ...savedMoviesIds])
    })
    .catch((err) => {
      console.log(err);
    })
}

const handleDeleteFromSaved = (movie) => {
  return mainApi.deleteFromSaved(movie)
    .then((res) => {
      setSavedMovies(state => state.filter(el => el._id !== res._id));
      setSavedMoviesIds(state => state.filter(el => el !== res.movieId));
    })
    .catch((err) => {
      console.log(err);
    })
}

const handleDislikeMovie = (id) => {
  const movieToDelete = savedMovies.find((el) => el.movieId === id);
  handleDeleteFromSaved(movieToDelete);
}

// resize
const resizeHandler = () => {
  setTimeout(() => {
    setCurrentWidth(window.innerWidth);
  }, 6000)
}

useEffect(() => {
  window.addEventListener('resize', resizeHandler);
  return () => {
    window.removeEventListener('resize', resizeHandler);
  }
}, [])

useMemo(() => {
  let res;
  let add;
  switch (true) {
    case currentWidth >= 1280:
      res = 12;
      add = 3;
      break;
    case currentWidth >= 768:
      res = 8;
      add = 2;
      break;
    case currentWidth >= 320:
      res = 5;
      add = 2;
      break;
    default:
      res = 6;
      add = 3;
      break;
  }
  console.log(currentWidth);
  setCardsToRender(res);
  setNumberOfCardsToAdd(add);
}, [currentWidth]
);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {isUserChecked ?
          <>
            {headerRoutes.includes(location.pathname) ?
              <Header
                loggedIn={isLoggedIn}/>
              : null}
            <Routes>
              <Route path='/' element={<Main />}></Route>
              <Route
                      path="/movies"
                      element={
                        <ProtectedRoute loggedIn={isLoggedIn}>
                          <Movies movies={movies}
                            onSearchSubmit={handleMoviesSearchSumit}
                            CardsToRender={CardsToRender}
                            numberOfCardsToAdd={numberOfCardsToAdd}
                            onSaveMovie={handleSaveMovies}
                            onDeleteMovie={handleDeleteFromSaved}
                            savedMoviesIds={savedMoviesIds}
                            onDislikeMovie={handleDislikeMovie}
                            isDataLoading={isDataLoading}
                            isSuccsesful={isSuccsesful}
                            isPopupOpened={isPopupOpened}
                            onClosePopup={handlePopupOpen} />
                        </ProtectedRoute>
                      } />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                    <SavedMovies savedMovies={savedMovies}
                      onDeleteMovie={handleDeleteFromSaved}
                      savedMoviesIds={savedMoviesIds}
                      isDataLoading={isDataLoading} />
                  </ProtectedRoute>
                } />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                    <Profile loggedIn={isLoggedIn}
                      onExit={handleExit}
                      onUpdateUserInfo={handleUpdateUserInfo}
                      isSuccsesful={isSuccsesful}
                      isPopupOpened={isPopupOpened}
                      onClosePopup={handlePopupOpen} />
                  </ProtectedRoute>
                } />
              <Route path='/signup' element={<Register onRegisterSubmit={handleRegisterSubmit}
                isSuccsesful={isSuccsesful}
                isPopupOpened={isPopupOpened}
                onClosePopup={handlePopupOpen} />}></Route>
              <Route path='/signin' element={<Login onLoginSubmit={handleLoginSubmit}
                isSuccsesful={isSuccsesful}
                isPopupOpened={isPopupOpened}
                onClosePopup={handlePopupOpen} />}></Route>
              <Route path='*' element={<PageNotFound />}></Route>
            </Routes>
            {footerRoutes.includes(location.pathname) ?
              <Footer />
              : null}
          </>
          :
          <Preloader />}
      </div>
    </CurrentUserContext.Provider>
  );
}

  
  export default App;
  
  

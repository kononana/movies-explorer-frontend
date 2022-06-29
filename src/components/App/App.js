import '../../vendor/normalize.css';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
 const headerRoutes = ['/', '/profile', '/movies', '/saved-movies'];
  const footerRoutes = ['/', '/movies', '/saved-movies'];
const location = useLocation();
  
  return (
   <div className="App">
{headerRoutes.includes(location.pathname) ?
 <Header />
: null}
   <Routes>
 <Route path='/' element={<Main />}></Route>
 <Route path='/movies' element={<Movies location={location} />}></Route>
 <Route path='/saved-movies' element={<SavedMovies location={location} />}></Route>
  <Route path='/profile' element={<Profile name='Анна' email='drug@yandex.ru' />}></Route>
 <Route path='/signup' element={<Register />}></Route>
   <Route path='/signin' element={<Login />}></Route>
  <Route path='*' element={<PageNotFound />}></Route>
   </Routes>
 {footerRoutes.includes(location.pathname) ?
 <Footer />
  : null}
   </div>
 );
  }
  
  export default App;
  
  

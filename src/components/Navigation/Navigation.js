
import { Link } from 'react-router-dom';
import './Navigation.css';


function Navigation() {
  return (
    <ul className="navigation">
      <li className='navigation__buttons'>
      <Link to="/" className="navigation__button navigation__main">
          Главная</Link>
      </li>
      <li className="navigation__buttons">
        <Link to="/movies" className="navigation__button navigation__movies">
          Фильмы</Link>
      </li>
      <li className="navigation__buttons">
        <Link to="/saved-movies" className="navigation__button navigation__saved-movies">
          Сохранённые фильмы</Link>
      </li>
    </ul>
  )
}

export default Navigation;
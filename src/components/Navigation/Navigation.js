import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

const Navigation = ({ loggedIn }) => {

    const linkIsActive = ({ isActive }) => {
        return `header__link ${isActive && 'header__link_active'}`;
    }

    return (
        <>
            {
                !loggedIn ?
                    <div className='header__auth'>
                        <Link to='/signup' className='header__button-register'>Регистрация</Link>
                        <Link to='signin'><button className='header__button-login'>Войти</button></Link>
                    </div>
                    :
                    <>
                        <div className='header__navigation'>
                            <NavLink to='/movies' className={linkIsActive}>Фильмы</NavLink>
                            <NavLink to='/saved-movies' className={linkIsActive}>Сохранённые фильмы</NavLink>
                        </div>
                        <Link to="/profile" className='header__profile'>
                          <span className='header__profile-text'>Аккаунт</span>
                          <span className='header__profile-logo'  />
                         </Link>
                    </>
            }
        </>
    )
}

export default Navigation;
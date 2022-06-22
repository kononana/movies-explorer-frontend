import './MobileMenu.css';
import { Link, NavLink } from 'react-router-dom';

const MobileMenu = ({ isChecked, onCloseMobileMenu }) => {

    const closeNavPopup = () => {
        onCloseMobileMenu()
    }
    const linkActiveClass = ({ isActive }) => {
        return `header__link header__link_mobile ${isActive && 'header__link_mob-active'}`;
    }

    return (
        <article className={`mobile-navigation ${isChecked && 'mobile-navigation_visible'}`}>
            <div className='mobile-navigation__popup'>
                <div  className="mobile-navigation__popup_content">
                    <NavLink to='/' onClick={closeNavPopup} className={linkActiveClass}>Главная</NavLink>
                    <NavLink to='/movies' onClick={closeNavPopup} className={linkActiveClass}>Фильмы</NavLink>
                    <NavLink to='/saved-movies' onClick={closeNavPopup} className={linkActiveClass}>Сохранённые фильмы</NavLink>
                </div>
                <Link to='/profile' onClick={closeNavPopup} className='header__profile header__profile-btn_mobile'><span className='header__profile-text'>Аккаунт</span> <span className='header__profile-logo' /></Link>
            </div>
        </article>
    )
}

export default MobileMenu;
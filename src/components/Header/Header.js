import React from "react";
import './Header.css';
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {

  const location = useLocation();
  const [Popup, setPopup] = React.useState('');

  return (
    <header className={`${location.pathname === '/' ? 'header' : 'header_background'}`}>
      <div className='header__container'>
        <Link className='header__logo-link' to="/">
          <img className='logo' src={logo} alt='логотип' /></Link>
        {location.pathname === '/' ? <div className='header__buttons'>
          <Link to="/signup" className='header__button-register'>Регистрация</Link>
          <Link to="/signin" className='header__button-login'>Войти</Link>
        </div> 
        :
          <><button className='header__menu-button' type='button'
            onClick={() => setPopup('popup_opened')}></button>
            <div className={`header__popup ${Popup}`}>
          
              <div className="header__menu">
                <button className="popup__close-button" type="button"
                onClick={() => setPopup('')}></button>
                <Navigation />
                <Link to="/profile" className='header__profile'>
                <span className='header__profile-text'>Аккаунт</span>
                <span className='header__profile-logo'  />
                </Link>
              </div>
            </div>
            <div className='header__buts header__buttons_authorized'>
               <Navigation />
            </div>
            <div className='header__buttons header__buttons_authorized'>
              <Link to="/profile" className='header__profile'>
                <span className='header__profile-text'>Аккаунт</span>
                <span className='header__profile-logo'  />
              </Link>
            </div>
            </>}
      </div>
    </header>
  )
}

export default Header;
import './SearchForm.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = ({ checkBoxChecked, changeCheckbox, onSearchSubmit}) => {
    const location = useLocation();
    const [error, setError] = useState('');
    const [searchMessage, setSearchMessage] = useState(location.pathname === '/movies' ? localStorage.getItem('searchMessage') || '' : '');

    const handleChange = (event) => {
        setError('');
        setSearchMessage(event.target.value);
    }

    function handleChangeCheckbox() {
      changeCheckbox(prevState => !prevState)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchMessage === '') {
            setError('пустой запрос')
        } else {
            onSearchSubmit(searchMessage);
            setError('');
        }
        location.pathname === '/movies' && localStorage.setItem('searchMessage', searchMessage);
    }


    return (
      <section className="search-film section__search-form">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-form__container">
          <input type='text' value={searchMessage || ''} onChange={handleChange} className='search-form__input' placeholder='Фильм'></input>
            <button className="search-form__submit-button"></button>
          </div>
          <label className="search-form__switch" >
        <input type="checkbox" className="search-form__checkbox" checked={checkBoxChecked} onChange={handleChangeCheckbox}/>
        <span className="search-form__slider"></span>
        <span className="search-form__slider-name">Короткометражки</span>
        </label>
        </form>
  
  
      </section>
    )
  }
  
  export default SearchForm;

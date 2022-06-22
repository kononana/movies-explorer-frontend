import './SearchForm.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import Filtration from '../Filtration/Filtration';

const SearchForm = ({ isCheckbobChecked, onCheckboxChange, onSearchSubmit}) => {
    const location = useLocation();
    const [error, setError] = useState('');
    const [searchMessage, setSearchMessage] = useState(location.pathname === '/movies' ? localStorage.getItem('searchMessage') || '' : '');

    const handleChange = (event) => {
        setError('');
        setSearchMessage(event.target.value);
    }

    const handleCheckboxChange = () => {
        onCheckboxChange();
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
          <Filtration isChecked={isCheckbobChecked} onCheckboxChange={handleCheckboxChange} />
        </form>
  
  
      </section>
    )
  }
  
  export default SearchForm;
import './SearchForm.css';
function SearchForm() {
    return (
      <section className="search-film section__search-form">
        <form className="search-form">
          <div className="search-form__container">
            <input type="text" autoComplete="off" name="movies" placeholder="Фильм"
              required className="search-form__input" />
            <button className="search-form__submit-button"></button>
          </div>
          <label className="search-form__switch">
            <input type="checkbox" className="search-form__checkbox" />
            <span className="search-form__slider"></span>
            <span className="search-form__slider-name">Короткометражки</span>
          </label>
        </form>
  
  
      </section>
    )
  }
  
  export default SearchForm;
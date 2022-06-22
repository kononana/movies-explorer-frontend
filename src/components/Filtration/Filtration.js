import './Filtration.css';

const Filtration = ({ isChecked, onCheckboxChange }) => {

    const handleChange = () => {
        onCheckboxChange();
    }

    return (
        <label className="search-form__switch" >
        <input type="checkbox" className="search-form__checkbox" checked={isChecked} onChange={handleChange}/>
        <span className="search-form__slider"></span>
        <span className="search-form__slider-name">Короткометражки</span>
        </label>
    )
}

export default Filtration;

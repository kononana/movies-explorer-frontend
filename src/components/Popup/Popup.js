import MobileMenu from '../MobileMenu/MobileMenu';
import './Popup.css';
import { useState } from 'react';

const Popup = () => {
    const [isChecked, setIsChecked] = useState(false);

    const closeMobileMenu = () => {
        setIsChecked(false);
    }

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <label className='burger-menu'>
                <input type='checkbox' checked={isChecked} onChange={handleChange} className='burger-menu__checkbox'></input>
                <span className='burger-menu__burger'></span>
            </label>
            <MobileMenu
                isChecked={isChecked}
                onCloseMobileMenu={closeMobileMenu} />
        </>
    )
}

export default Popup;
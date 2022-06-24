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
            <label className='side-menu'>
                <input type='checkbox' checked={isChecked} onChange={handleChange} className='side-menu__checkbox'></input>
                <span className='side-menu__burger'></span>
            </label>
            <MobileMenu
                isChecked={isChecked}
                onCloseMobileMenu={closeMobileMenu} />
        </>
    )
}

export default Popup;
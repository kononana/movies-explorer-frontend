import './InfoBox.css';
import right from "../../images/tick.svg";
import wrong from "../../images/cross.svg"
import { useLocation } from 'react-router-dom';

function InfoBox({ isOpen, onClose, isSuccsesful }) {
    const location = useLocation();

    const figcaptionText = isSuccsesful ? "Все в порядке!" :
        location.pathname === '/movies' ? "Во время запроса произошла ошибка"
            : "Что-то пошло не так. Повторите запрос";

    return (
        <article className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_infoTool">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <figure className="popup__figure">
                    <img className='popup__image' src={isSuccsesful ? right : wrong} alt="успеx" />
                    <figcaption className="popup__text popup__text_type_infoTool">{figcaptionText}</figcaption>
                </figure>
            </div>
        </article>
    );
}

export default InfoBox;
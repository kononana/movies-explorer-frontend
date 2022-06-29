import './MoviesCard.css';
import film from '../../images/movie1.jpg';

const MoviesCard = ({ location }) => {
    return (
        <article className='movies-card'>
            <div className='movies-card__info'>
                <h2 className='movies-card__title'>ни слова о море</h2>
                <p className='movies-card__duration'>1ч 12м</p>
            </div>
            <img className='movies-card__image' src={film} alt='карточка'></img>
            <div>
                {location.pathname === '/movies' ?
                    <button className='movies-card__save-btn movies-card__save-btn_active'></button>
                    :
                    <button className='movies-card__delete-btn'></button>}
            </div>
            
        </article>
    )
}

export default MoviesCard;
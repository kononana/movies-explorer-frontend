import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <div className='notfound-page'>
            <h2>404</h2>
            <p>Страница не найдена</p>
            <Link to='/'>Назад</Link>
        </div>
    )
}

export default PageNotFound;
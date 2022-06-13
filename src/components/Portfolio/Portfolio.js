import './Portfolio.css';

function Portfolio() {
    return (
        <section className='portfolio'>
            <div className='portfolio__content'>
                <h2 className='portfolio__title'>Портфолио</h2>
                <ul className='portfolio__list'>
                    <li><a href='https://kononana.github.io/how-to-learn/' target='blank'>Статичный сайт</a></li>
                    <li><a href='https://kononana.github.io/russian-travel/' target='blank'>Адаптивный сайт</a></li>
                    <li><a href='https://vmesto.nomoredomains.work/' target='blank'>Одностраничное приложение</a></li>
                </ul>
            </div>
        </section>
    )
}

export default Portfolio;
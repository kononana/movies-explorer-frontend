import './AboutMe.css';
import mylook from '../../images/photo.jpg';

function AboutMe() {
    return (
        <section className='about-me' id='about-me'>
            <div className='about-me__content'>
                <h2 className='about-me__title'>Студент</h2>
                <div className='about-me__info'>
                    <h2 className='about-me__name'>Анна</h2>
                    <p className='about-me__occupation'>Фронтенд-разработчик, 33 год</p>
                    <p className='about-me__about'>Живу в Подмосковье, по профессии маркетолог. Недавно начала кодить и решила попробовать свои силы в сфере веб-разработки, так как мне нравится 
                    создать удобные пользовательские интерфейсы. По выходным учусь играть на укулеле, катаюсь на велосипеде, хожу в походы.</p>
                    <ul className='about-me__links'>
                        <li><a href='https://www.facebook.com/' target='blank'>Facebook</a></li>
                        <li><a href='https://github.com/kononana' target='blank'>Github</a></li>
                    </ul>
                    <img className='about-me__photo' src={mylook} alt='фото'></img>
                </div>

            </div>
        </section>
    )
}

export default AboutMe;
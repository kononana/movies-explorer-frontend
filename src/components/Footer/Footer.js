import './Footer.css';

function Footer() {
    return(
      <section className=" section-foot footer">
        <p className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__container">
          <p className="footer__copyright">&copy; 2022</p>
          <ul className="footer__links">
            <li className="footer__list">
              <a className="footer__link" href="https://practicum.yandex.ru"
              target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__list">
              <a className="footer__link" href="https://github.com/"
              target="_blank" rel="noreferrer">Github</a>
            </li>
            <li className="footer__list">
              <a className="footer__link" href="https://www.facebook.com/"
              target="_blank" rel="noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </section>
    )
  }
  
  export default Footer;
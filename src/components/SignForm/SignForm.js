import './SignForm.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
const SignForm = ({ onSubmit, titleText, buttonText, spanText, linkText, linkTo, children, reallyValid }) => {

    const location = useLocation();
    
    return (
        <section className='auth'>
            <Link to='/'><img className='logo logo_type_auth' src={logo} alt='логотип'></img></Link>
            <form className='form' onSubmit={onSubmit}>
                <h2 className='form__title'>{titleText}</h2>
                <div className='form__input-container'>
                    {children}
                </div>
                <button className={`form__button ${!reallyValid &&
          'form__button_disabled'}`}
          type="submit" disabled={!reallyValid} >
          {buttonText}</button>
            </form>
            <span className='form__signin'>{spanText} <Link className="form__link" to={linkTo}>{linkText}</Link></span>
        </section>
    )
}

export default SignForm;
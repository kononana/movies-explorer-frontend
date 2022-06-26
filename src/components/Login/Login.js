import './Login.css';
import SignForm from '../SignForm/SignForm';
import { useValidationForms } from '../useValidationForms/useValidationForms';
import InfoBox from '../InfoBox/InfoBox';

const Login = ({ onLoginSubmit, isSuccsesful, isPopupOpened, onClosePopup }) => {
    const { values, errors, isValid, handleChange } = useValidationForms({ email: '', password: '' });

    const realyValid = isValid && errors.email === '';

    const onSubmit = (event) => {
        event.preventDefault();
        onLoginSubmit(values)
    }

    return (
        <>
        <SignForm  onSubmit={onSubmit} titleText='Рады видеть!' buttonText='Войти' spanText='Ещё не зарегистрированы?' linkText='Регистрация' linkTo='/signup' realyValid={realyValid}>
            <label name='login-email' className='form__label'>E-mail</label>
            <input type='email' id='login-email' name='email' className='form__input form__input_type_email'
                required value={values.email} onChange={handleChange}></input>
            <span className='form__error'>{errors.email}</span>
            <label name='login-password' className='form__label'>Пароль</label>
            <input type='password' id='login-password' name='password' className='form__input form__input_type_password'
                required minLength='4' maxLength='30' value={values.password} onChange={handleChange}></input>
            <span className='form__error'>{errors.password}</span>
        </SignForm >
        <InfoBox isOpen={isPopupOpened} onClose={onClosePopup} isSuccsesful={isSuccsesful} />
        </>
    )
}

export default Login;
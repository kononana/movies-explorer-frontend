import './Register.css';
import SignForm from '../SignForm/SignForm';
import InfoBox from '../InfoBox/InfoBox';
import { useValidationForms } from '../useValidationForms/useValidationForms';

const Register = ({ onRegisterSubmit, isPopupOpened, onClosePopup, isSuccsesful }) => {
    const { values, errors, isValid, handleChange } = useValidationForms();

    const onSubmit = (event) => {
        event.preventDefault();
        onRegisterSubmit(values)
    }

    return (
        <>
            <SignForm onSubmit={onSubmit} isValid={isValid} titleText='Добро пожаловать!' buttonText='Зарегистрироваться' spanText='Уже зарегистрированы?' linkText='Войти' linkTo='/signin' >
                <label name='register-name' className='form__label'>Имя</label>
                <input type='text' id='register-name' name='name' className='form__input form__input_type_name'
                    required minLength='2' maxLength='30' value={values.name || ''} onChange={handleChange}></input>
                <span className='form__error'>{errors.name}</span>
                <label name='register-email' className='form__label'>E-mail</label>
                <input type='email' id='register-email' name='email' className='form__input form__input_type_email'
                    required value={values.email || ''} onChange={handleChange}></input>
                <span className='form__error'>{errors.email}</span>
                <label name='register-password' className='form__label'>Пароль</label>
                <input type='password' id='register-password' name='password' className='form__input form__input_type_password'
                    required minLength='4' maxLength='30' value={values.password || ''} onChange={handleChange}></input>
                <span className='form__error'>{errors.password}</span>
            </SignForm>
            <InfoBox isOpen={isPopupOpened} onClose={onClosePopup} isSuccsesful={isSuccsesful} />
        </>
    )
}

export default Register;
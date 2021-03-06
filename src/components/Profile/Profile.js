import "./Profile.css";

const Profile = ({ name, email }) => {
    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__hello">Привет, {name}!</h2>
                <div className="profile__info">
                    <div className="profile__info-container">
                        <label name="name">Имя</label>
                        <input id="name" type='text' className="profile__input profile__input_type_name" value={name} required></input>
                    </div>
                    <div className="profile__info-container">
                        <label name="email">E-mail</label>
                        <input id='email' className="profile__input profile__input_type_email" value={email} required></input>
                    </div>
                </div>
                <div className="profile__buttons">
                    <button className="profile__button profile__button_type_update">Редактировать</button>
                    <button className="profile__button profile__button_type_exit">Выйти из аккаунта</button>
                </div>
            </div>
        </section>
    )
}

export default Profile;
import './MoviesCardList.css';

const MoviesCardList = ({  children, location }) => {
    return (
            <section className='movies-list'>
                <div className='movies-card-list'> 
                {children}
            </div>
            
            {location.pathname === '/movies' && 
            <div className='movies-btn-container'>
                <button className='movies-btn'>Ещё</button>
            </div>}
            </section>
    
        
   

    )
}

export default MoviesCardList;
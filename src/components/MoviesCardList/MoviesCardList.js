import './MoviesCardList.css';

const MoviesCardList = ({  children }) => {
    return (
            <section className='movies-list'>
                <div className='movies-card-list'> 
                {children}
            </div>
            </section>
    
        
   

    )
}

export default MoviesCardList;
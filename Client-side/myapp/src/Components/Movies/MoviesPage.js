import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { StateApp } from '../GlobalState'

export default function MoviesPage() {
    const navigate = useNavigate()

    const   
    [
         
        [reloadData, setReloadData], 
        [searchStringToProps, setSearchStringToProps],

    ] = useContext(StateApp)

    const allMovies = () => {
        setSearchStringToProps('')
        navigate('movies')
    }

    const addMovie = () => {
        navigate('add_movie')
    }

    return (
        <div>
            <h1>Movies</h1>
            <button className='buttonTop' onClick={allMovies}>All Movies</button>
            {sessionStorage['permissions'].includes('CreateMovies')?
            <button className='buttonTop' onClick={addMovie}>Add Movie</button>:null}
            <br/>
            <Outlet/>
            <div style={{width:'100%', height: '300px'}}></div>
        </div>
    )
}

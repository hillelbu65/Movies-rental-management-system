import React, { useContext, useEffect, useState } from 'react'
import { getAllMembers, getMemberById } from '../../DAL/MembersDal'
import { getAllMovies, getMovieById } from '../../DAL/MoviesDAL'
import { getMoviesAllData } from '../../Utils/MoviesUtils'
import { StateApp } from '../GlobalState'
import Movie from './Movie'

export default function Movies() {
    const   
    [
        
        [reloadData, setReloadData],
        [searchStringToProps, setSearchStringToProps]
    
    ] = useContext(StateApp)

    const [searchString, setSearchString] = useState('')
    const [movies,  setMovies] = useState([])

    //Put all the movie data in state.
    useEffect( async () => {
        const movies = await getMoviesAllData()
        setMovies(movies)
    }, [reloadData])


    //handles the search bar, present the filtered movies.
    useEffect(async () => {
        if(searchStringToProps.length == 0){
            setReloadData(Math.random())
        }else{
            const movies = await getMoviesAllData()
            const filtersMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchStringToProps.toLowerCase()))
            if(filtersMovies.length != 0){
                setMovies(filtersMovies)
            }else{
                alert('No results')
            }
        }
    }, [searchStringToProps])

    //set search string in global state.
    const search = () => {
        setSearchStringToProps(searchString)
    }

    //repeater - for specific movie component to present it.
    const movie = movies.map((movie, index) => {
        return(
            <Movie key = {index}  movieData = {movie}/>
        ) 
    })

    return (
        <div>
            <input  type='text' onChange={(e) => setSearchString(e.target.value)}/>
            <button onClick={search}>Find</button>

            <div style={{display: "grid", 
            gridGap: '20px', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', 
            paddingLeft: '1%'}}>
                {movie}
            </div>
        </div>
    )
}

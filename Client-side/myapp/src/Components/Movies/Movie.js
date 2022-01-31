import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getAllMembers, getMemberById } from '../../DAL/MembersDal'
import { deleteMovie, getAllMovies } from '../../DAL/MoviesDAL'
import { getAllsubscriptions, updateSubscription} from '../../DAL/SubscriptionsDal'
import { StateApp } from '../GlobalState'
import '../Style/Movie.css'
import MembersWached from './MembersWatched'

export default function Movie(props) {
    const {id} = useParams()
    const navigate = useNavigate()
    const   
    [
         
        [reloadData, setReloadData], 
    
    ] = useContext(StateApp)

    //repeater of movie's geners to display.
    const movieGenres = props.movieData.genres.map((genre, index) => {
        return(
            <span key = {index}>{index == props.movieData.genres.length -1? genre + "": genre + ","}</span>
        )
    })

    // delete a specific movie from all the relevant data sources.
    const deleteMe = async () => {
        const movieId = props.movieData._id
        const response = await (await deleteMovie(props.movieData._id)).data
        if(response.deleted){
            const allSubs = await (await getAllsubscriptions()).data
            allSubs.forEach(async (sub) =>{
                const id = sub._id;
                const newArray = sub.movies.filter(mov => mov.movieId !== movieId)
                const toUpdate = {movies: [...newArray]}
                const res = await (await updateSubscription(id, toUpdate)).data
            })
            setReloadData(props.movieData._id)
            if(id){
                navigate(-1)
            }
        }else{
            alert('Error')
        }

    }

    //redirect to edit movie page.
    const editMe =  () => {
        navigate(`/home/editmovie/${props.movieData._id}`)
    }

    const YEAR = new Date(props.movieData.premiered).getFullYear()
    return (
        <div className='movie'>
            <div className='movieHeader'>
                <h2>{`${props.movieData.name}, ${YEAR}`}</h2>
            </div>
            Genres: {movieGenres}<br/>
            <img className='img' src={props.movieData.image}/><br/>
            {sessionStorage['permissions'].includes('UpdateMovies') ? <button className='buttonMovie' onClick={editMe}>Edit</button>: null}
            {sessionStorage['permissions'].includes('DeleteMovies') ? <button className='buttonMovie' onClick={deleteMe}>Delete</button>: null}
            {<MembersWached MovieData = {props.movieData}/>}
        </div>
    )
}

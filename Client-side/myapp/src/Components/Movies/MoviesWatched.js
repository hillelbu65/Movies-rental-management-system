import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { getAllMovies } from '../../DAL/MoviesDAL';
import { addSubscriptionData, moviesWached } from '../../Utils/MoviesUtils';
import { StateApp } from '../GlobalState';

export default function MoviesWatched(props) {
    const navigate = useNavigate()
    
    const   
    [
         
        [reloadData, setReloadData], 
        [searchStringToProps, setSearchStringToProps]
    
    ] = useContext(StateApp)


    const [moviesList, setMoviesList] = useState([])
    const [movies, setMovies] = useState([])
    const [visDiv, setVisDiv] =  useState(false)
    const [selectValue, setSelectValue] = useState('')
    const [date, setDate] = useState('')
    const [reload, setReload] = useState(false)

    //arrange movies that the subscriber watched to dispaly their name and date accordingly.
    useEffect( async () => {
        const allMovies = await (await getAllMovies()).data
        setMovies(allMovies)
        const wached = await moviesWached(props.memberData._id)
        setMoviesList(wached)
    }, [reloadData, reload])

    //filter from all  movies  only the movies the member did not watched.
    const moviesNOTwached = movies.filter(movie => !moviesList.find(mov => movie.name == mov.name))

    //create a list of the movies the member can subscribe to.
    const  moviesListDropDown = moviesNOTwached.map((movie, index) => {
        return(
            <option key={index} value={movie._id}>{movie.name}</option>
        )
    })

    //repeater - that display the  movies that a member watched in a list.
    const movie = moviesList.map((mov, index) =>{ 
    return(<a onClick={() => {
        setSearchStringToProps(mov.name)
        navigate(`/home/moviespage/movies`)}}><li key={index}>{`${mov.name} ${mov.date}`}</li></a>)
    }) 

    //submit the "subscribtions to movie" data
    const submit = async (e) => {
        e.preventDefault()
        //check  if the form is full and send the new movie to server.
        if(date != '' && selectValue != ''){
        const add = await addSubscriptionData(props .memberData._id, selectValue, date)
        }else{
            alert('Please choose movie & date they mandetory')
        }
        setVisDiv(!visDiv)
        setReloadData(Math.random())
    }

  return <div style={{
      backgroundColor: '#F5DFBB', 
      borderRadius: '10px', 
      textAlign: 'left',
      padding: '5px'}}>
      <h3>Movies Wached</h3>
      <button onClick={() => setVisDiv(!visDiv)} style={{
          padding: '10px', 
          borderRadius: '5px',
          borderStyle:'none',
          backgroundColor: '#562C2C',
          color: 'white',
          marginTop: ''}}>Subscribe to new movie</button><br/>
          {visDiv?<div>
              <form onSubmit={submit}>
            <select onChange={(e) => setSelectValue(e.target.value)}>
                <option value='' selected='selected'>Choose Movie</option>
                {moviesListDropDown}
            </select>
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
            <button type='submit'>Add</button>
            </form>
          </div>:null}

          <ul>
            {movie}
          </ul>

          <div style={{height: '300px'}}></div>
  </div>;
}

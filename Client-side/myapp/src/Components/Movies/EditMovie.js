import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getMovieById, updateMovie } from '../../DAL/MoviesDAL'

export default function EditMovie() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [name, setName] = useState('')
    const [genres, setGenres] = useState('')
    const [url, setUrl] = useState('')
    const [premired, setPremired] = useState('')


    //Loads all movie data to state for the proper fiald in the form.
    useEffect( async () => {
        const response =  await (await getMovieById(id)).data
        setName(response.name)
        setGenres(response.genres)
        setUrl(response.image)
        setPremired(response.premiered.slice(0,10))
    }, [])


    //submit the  edited movie form.
    const submit = async (e) => {
        e.preventDefault()

        //Validation - check if the form is fulll and if it is send the updated movie data to the server.
        if(name.length == null || genres == null || url.length == null || premired.length == null){
                alert('All fields are mandatorys')
            }else{
                //Create a new object to server utils.
                const nweMovie = {
                    name: name,
                    genres: [genres],
                    image: url,
                    premiered: new Date (premired)
                }
                const response = await (await updateMovie(id, nweMovie)).data
                if(response.updete){
                    alert('update')
                    navigate('/home/moviespage/movies')
                }else{
                    alert('Error')
            }
        }
    }

    const back = () => {
        navigate(-1)
    }

    return (
        <div>
            <h1>Edit Movie</h1>
            <form onSubmit={submit}> 
                <input type='text' 
                value={name} onChange={(e) => setName(e.target.value) }
                placeholder='Name'/><br/>
                <input type='text' 
                value={genres} onChange={(e) => setGenres(e.target.value) }
                placeholder='Genres'/><br/>
                <input type='text' 
                value={url} onChange={(e) => setUrl(e.target.value) }
                placeholder='Imge url'/><br/>
                <input type='date' 
                value={premired} onChange={(e) => setPremired(e.target.value) }
                placeholder='Premiered'/><br/>
                <button type='submit'>Save</button>
            </form>
            <button onClick={back}>Cansel</button>
        </div>
    )
}

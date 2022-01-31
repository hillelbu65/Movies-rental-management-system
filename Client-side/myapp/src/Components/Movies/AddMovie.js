import React, {useState } from 'react'
import { useNavigate } from 'react-router'
import { addMovie } from '../../DAL/MoviesDAL'

export default function AddMovie() {

    const navigate = useNavigate()// Call to navigate

    const [name, setName] = useState('')
    const [genres, setGenres] = useState('')
    const [url, setUrl] = useState('')
    const [premired, setPremired] = useState('')


    //Submit the add user form.
    const submit = async (e) => {
        e.preventDefault()

        // check if the form is fulll and if it is send the new movie  data to the server.
        if(name.length == '' || genres == '' || url.length == '' || premired.length == ''){
                alert('All fields are mandatorys')
            }else{

                //Create a nwe object movie for adding. 
                const nweMovie = {
                    name: name,
                    genres: [genres],
                    image: url,
                    premiered: new Date (premired)
                }
                const response = await (await addMovie(nweMovie)).data
                if(response.added){
                    alert('Added')
                }else{
                    alert('Error')
            }
        }
    }

    
    return (
        <div>
            <h1>Add movie</h1>
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
                <button type='submit'>Add</button>
            </form>
            <button onClick={() => navigate(-1)}>Cansel</button>
            

        </div>
    )
}

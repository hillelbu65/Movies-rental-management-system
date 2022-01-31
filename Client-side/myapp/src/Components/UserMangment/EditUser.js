import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { getUserById, updateUser } from '../../DAL/UsersDAL'

export default function EditUser() {
    const navigate = useNavigate()

    const {id} = useParams('')
    const [fName, setFname] = useState('')
    const [lName, setLname] = useState('')
    const [username, setUsername] = useState('')
    const [sessionTimeOut, setSessionTimeOut] = useState('')
    const [createDate, setCreateDate] = useState('')

    const [ViewSubscriptions, setViewSubscriptions] = useState(false)
    const [CreateSubscriptions, setCreateSubscriptions] = useState(false)
    const [DeleteSubscriptions, setDeleteSubscriptions] = useState(false)
    const [UpdateSubscriptions, setUpdateSubscriptions] = useState(false)

    const [ViewMovies, setViewMovies] = useState(false)
    const [CreateMovies, setCreateMovies] = useState(false)
    const [DeleteMovies, setDeleteMovies] = useState(false)
    const [UpdateMovies, setUpdateMovies] = useState(false)

    //Loads all the users data to the state and  display in the form.
    useEffect( async() => {
        const response =  await (await getUserById(id)).data
        setFname(response.fName)
        setLname(response.lName)
        setUsername(response.username)
        setCreateDate(response.createDate)
        setSessionTimeOut(response.sessionTimeOut /60000)
        response.permission.find(p => p == 'ViewSubscriptions')?setViewSubscriptions(true):setViewSubscriptions(false)
        response.permission.find(p => p == 'CreateSubscriptions')?setCreateSubscriptions(true):setCreateSubscriptions(false)
        response.permission.find(p => p == 'DeleteSubscriptions')?setDeleteSubscriptions(true):setDeleteSubscriptions(false)
        response.permission.find(p => p == 'UpdateSubscriptions')?setUpdateSubscriptions(true):setUpdateSubscriptions(false)
        response.permission.find(p => p == 'ViewMovies')?setViewMovies(true):setViewMovies(false)
        response.permission.find(p => p == 'CreateMovies')?setCreateMovies(true):setCreateMovies(false)
        response.permission.find(p => p == 'DeleteMovies')?setDeleteMovies(true):setDeleteMovies(false)
        response.permission.find(p => p == 'UpdateMovies')?setUpdateMovies(true):setUpdateMovies(false)
    }, [])

    useEffect(() => {
        if(CreateSubscriptions || DeleteSubscriptions || UpdateSubscriptions){// check if  one of these are checked
            setViewSubscriptions(true)//If so make "View  Subscriptions" checkbox checked.
        }
    }, [CreateSubscriptions, DeleteSubscriptions, UpdateSubscriptions])

    useEffect(() => {
        if(!ViewSubscriptions){//If "View subscriptions" checkbox is not checked?
            setCreateSubscriptions(false)//Unchecked
            setDeleteSubscriptions(false)//Unchecked
            setUpdateSubscriptions(false)//Unchecked
        }
    }, [ViewSubscriptions])

    useEffect(() => {
        if(CreateMovies || DeleteMovies || UpdateMovies){// check if  one of these are checked
            setViewMovies(true)//If so make "View  movies" checkbox checked.
        }
    }, [CreateMovies, DeleteMovies, UpdateMovies])

    useEffect(() => {
        if(!ViewMovies){//If "View movies" checkbox is not checked?
            setCreateMovies(false)//Unchecked
            setDeleteMovies(false)//Unchecked
            setUpdateMovies(false)//Unchecked
        }
    }, [ViewMovies])


    //Submit the uptate user data. 
    const submit = async (event) => {

        //Check if all fialds in the form are valid. if sow send the data to the server.
        if(fName != '' && lName != '' && username != '' && sessionTimeOut != ''){
        event.preventDefault()
        const newUser = {
            fName: fName,
            lName: lName,
            username: username,
            createDate: createDate,
            sessionTimeOut: sessionTimeOut * 60000,
            permissions: 
            [
                ViewSubscriptions?'ViewSubscriptions':null,
                CreateSubscriptions?'CreateSubscriptions':null,
                DeleteSubscriptions?'DeleteSubscriptions':null,
                UpdateSubscriptions?'UpdateSubscriptions':null,
                ViewMovies?'ViewMovies':null,
                CreateMovies?'CreateMovies':null,
                DeleteMovies?'DeleteMovies':null,
                UpdateMovies?'UpdateMovies':null
            ]
        }
        //If the response.data.update is true. alert a proper massege. and navigate to all user page 
        const response =  await updateUser(id, newUser)
            if(response.data.update){
                alert('Update Successfully!')
                navigate('/home/usersmangment/users')
            }
        }
    }
    
    //Navigate to all users page.
    const back = () => {
        navigate('/home/usersmangment/users')
    }

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={submit}>
                First Name : <br/><input type='text' value={fName}  onChange={(e) => setFname(e.target.value)}/><br/>
                Last Name : <br/><input type='text' value={lName} onChange={(e) => setLname(e.target.value)}/><br/>
                Username : <br/><input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
                Session time out (Minutes) : <br/><input type='number' min={'0'} value={sessionTimeOut} onChange={(e) => setSessionTimeOut(e.target.value)}/><br/>

                <h5>Create date: {createDate}</h5>
                <input type={'checkbox'} checked={ViewSubscriptions} onChange={(e) => setViewSubscriptions(e.target.checked)}/> <span>View Subscriptions</span> <br/>
                <input type={'checkbox'} checked={CreateSubscriptions}  onChange={(e) => setCreateSubscriptions(e.target.checked)}/> <span>Create Subscriptions</span> <br/> 
                <input type={'checkbox'} checked={DeleteSubscriptions} onChange={(e) => setDeleteSubscriptions(e.target.checked)}/> <span>Delete Subscriptions</span> <br/>
                <input type={'checkbox'} checked={UpdateSubscriptions} onChange={(e) => setUpdateSubscriptions(e.target.checked)}/> <span>Update Subscriptions</span> <br/>
                <input type={'checkbox'} checked={ViewMovies} onChange={(e) => setViewMovies(e.target.checked)}/> <span>View Movies</span> <br/>
                <input type={'checkbox'} checked={CreateMovies} onChange={(e) => setCreateMovies(e.target.checked)}/> <span>Create Movies</span> <br/>
                <input type={'checkbox'} checked={DeleteMovies} onChange={(e) => setDeleteMovies(e.target.checked)}/> <span>Delete Movies</span> <br/>
                <input type={'checkbox'} checked={UpdateMovies} onChange={(e) => setUpdateMovies(e.target.checked)}/> <span>Update Movies</span> <br/>
                <button type='submit'>Update</button>
            </form>
            <button onClick={back}>Cansel</button>
            <div style={{height:'200px'}}></div>
        </div>

    )
}

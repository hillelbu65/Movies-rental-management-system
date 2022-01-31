import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { addUser } from '../../DAL/UsersDAL'

export default function AddUser() {
    const navigate =  useNavigate()
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

    const [permissions, setPermissions] = useState([])


    //set the create in state for present it.
    useEffect(() => {
        setCreateDate(new Date().toLocaleDateString('he-IL', {timeZone:'Asia/Jerusalem'}).replace(/\D/g,'/'))
    }, [createDate])

    useEffect(() => {
        if(CreateSubscriptions || DeleteSubscriptions || UpdateSubscriptions){// check if  one of these are checked
            setViewSubscriptions(true)//if so make "View  Subscriptions" checkbox checked.
        }
    }, [CreateSubscriptions, DeleteSubscriptions, UpdateSubscriptions])

    useEffect(() => {
        if(!ViewSubscriptions){// if "View subscriptions" checkbox is not checked?
            setCreateSubscriptions(false)//unchecked
            setDeleteSubscriptions(false)//unchecked
            setUpdateSubscriptions(false)//unchecked
        }
    }, [ViewSubscriptions])

    useEffect(() => {
        if(CreateMovies || DeleteMovies || UpdateMovies){//check if  one of these are checked
            setViewMovies(true)//if so make "View  movies" checkbox checked.
        }
    }, [CreateMovies, DeleteMovies, UpdateMovies])

    useEffect(() => {
        if(!ViewMovies){// if "View movies" checkbox is not checked?
            setCreateMovies(false)//unchecked
            setDeleteMovies(false)//unchecked
            setUpdateMovies(false)//unchecked
        }
    }, [ViewMovies])



    //submit the add new user form.
    const submit = async (event) => {
        //if all the fialds are valid send the new user data to the server.
        if(fName != '' && lName != '' && username != '' && sessionTimeOut != ''){
            event.preventDefault()
            const newUser = {
                fName: fName,
                lName: lName,
                username: username,
                CreateDate: createDate,
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
        const response = await addUser(newUser)
        if(response.data.userAuthentication){
            alert('Added Successfully!')
        }
        }else{
            alert('All fialds are mandatory')
        }
    }
    
    return (
        <center><div>
            <h1>Add User</h1>
            <form onSubmit={submit}>
                First Name : <br/><input type='text' value={fName}  onChange={(e) => setFname(e.target.value)}/><br/>
                Last Name : <br/><input type='text' value={lName} onChange={(e) => setLname(e.target.value)}/><br/>
                Username : <br/><input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
                Session time out (Minutes) : <br/><input type='number' min='0' value={sessionTimeOut} onChange={(e) => setSessionTimeOut(e.target.value)}/><br/>

                <h5>Create date: {createDate}</h5>
                <input type={'checkbox'} checked={ViewSubscriptions} onChange={(e) => setViewSubscriptions(e.target.checked)}/> <span>View Subscriptions</span> <br/>
                <input type={'checkbox'} checked={CreateSubscriptions}  onChange={(e) => setCreateSubscriptions(e.target.checked)}/> <span>Create Subscriptions</span> <br/> 
                <input type={'checkbox'} checked={DeleteSubscriptions} onChange={(e) => setDeleteSubscriptions(e.target.checked)}/> <span>Delete Subscriptions</span> <br/>
                <input type={'checkbox'} checked={UpdateSubscriptions} onChange={(e) => setUpdateSubscriptions(e.target.checked)}/> <span>Update Subscriptions</span> <br/>
                <input type={'checkbox'} checked={ViewMovies} onChange={(e) => setViewMovies(e.target.checked)}/> <span>View Movies</span> <br/>
                <input type={'checkbox'} checked={CreateMovies} onChange={(e) => setCreateMovies(e.target.checked)}/> <span>Create Movies</span> <br/>
                <input type={'checkbox'} checked={DeleteMovies} onChange={(e) => setDeleteMovies(e.target.checked)}/> <span>Delete Movies</span> <br/>
                <input type={'checkbox'} checked={UpdateMovies} onChange={(e) => setUpdateMovies(e.target.checked)}/> <span>Update Movies</span> <br/>
                <button type='submit'>Save</button>
            </form>
            <button onClick={() => navigate(-1)} >Cansel</button>
        </div></center>
    )
}

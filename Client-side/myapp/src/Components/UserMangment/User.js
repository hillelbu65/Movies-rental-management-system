import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { deleteUser } from '../../DAL/UsersDAL'
import { StateApp } from '../GlobalState'

export default function User(props) {
    const [userData] = useState(props)

    const   
    [
        
        [reloadData, setReloadData], 
    
    ] = useContext(StateApp)

    const navigate = useNavigate()
    //Redirect to edit user page
    const editUser = () => {
        navigate(`/home/edituser/${userData.data.id}`)
    }
    
    //Delete this specific user 
    const deleteMe = async () => {
        const respons =  await deleteUser(userData.data.id)
        setReloadData(Math.random())
        return respons.data.deleted  
    }

    //Fix the created date of a user and display accordingly.
    const creatDate = `${userData.data.createDate.slice(0,2)}/${userData.data.createDate.slice(3,4)}/${userData.data.createDate.slice(7,10)}`
    
    return (
        <div style={{border: 'solid black 2px', width: '400px', borderRadius: '10px', margin: '10px'}}>
            <h3>{userData.data.username == 'Hillel123'?'Admin': null}</h3>
            Full Name : {userData.data.fullName}<br/>
            UserName : {userData.data.username}<br/>
            Session time out : {`${userData.data.sessionTimeOut / 60000} minutes`}<br/>
            Create Date: {creatDate}<br/>
            Permissions : <ul>{userData.data.permission.map(permission =>  permission? <li>{permission.toString()}</li>:null)}</ul> 
            {userData.data.username == 'Hillel123'? <button onClick={editUser}>Edit</button>:<div><button onClick={editUser}>Edit</button><button onClick={deleteMe}>Delete</button></div>}
        </div>
    )
}

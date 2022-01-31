import React, { useContext, useEffect, useState } from 'react'
import { getAllUsers } from '../../DAL/UsersDAL'
import { StateApp } from '../GlobalState'
import User from './User'

export default function Users() {
    const [usersData, setUsersData] = useState([])
    const   
    [
        [reloadData, setReloadData], 
    
    ] = useContext(StateApp)

    //Get all users and set them in state.
    useEffect( async () => {
        const response = await (await getAllUsers()).data
        setUsersData(response)
    },[reloadData])

    //Repeater- create a list of user compnents.
    const users = usersData.map((user, index) => <User key={index} data={user}/>)

    return (
        <div>
            <h1>users</h1>
            {users}
        </div>
    )
}

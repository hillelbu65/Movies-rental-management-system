import React from 'react'
import { Outlet, useNavigate } from 'react-router'

export default function UsersMangment() {
    const navigate = useNavigate();

    const addUser = () => {
        navigate('adduser')
    }

    const users = () => {
        navigate('users')
    }
    return (
        <div>
            <br/>
            <button onClick={users}>All Users</button>
            <button onClick={addUser}>Add Users</button>
            <Outlet/>
            <div style={{width:'100%', height: '300px'}}></div>
        </div>
    )
}

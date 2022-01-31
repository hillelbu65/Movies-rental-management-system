import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import '../Style/buttons.css'

export default function Subscriptions() {
    const navigate = useNavigate()

    const allMembers = () => {
        navigate('members')
    }

    const addMember = () => {
        navigate('add_member')
    }
  
    return (
        <div style={{textAlign: 'left', marginLeft: '5px'}}>

            <button className='button' style={{marginLeft: '10px'}} 
            onClick={allMembers}>All Members</button>
            {sessionStorage['permissions'].includes('CreateSubscriptions') ? 
            <button  className='button' style={{marginLeft: '20px'}} onClick={addMember}>Add Member</button>: null}
            <Outlet/>
        </div>
    )
}

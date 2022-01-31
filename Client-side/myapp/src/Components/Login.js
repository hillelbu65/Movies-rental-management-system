import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import {useNavigate} from 'react-router'
import { sendPasswordAndUsername } from '../DAL/logInDAL'
import { StateApp } from './GlobalState'

export default function LogIn() {
    const navigate =  useNavigate()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()


    //Set all the values in sessionStorage to false. to prevent security issues,  onload.
    useEffect(() => {
        sessionStorage['id'] = false
        sessionStorage['admin'] = false
        sessionStorage['letAcsses'] = false
        sessionStorage['permissions'] = false
        sessionStorage['sessionTimeOut'] = false
    },[])

    //send login request to the server. 
    const send = async () => {
        const res = await (await sendPasswordAndUsername(username, password)).data

        //If the data is valid conecct the user else display error.
        if(res.letAcsses == false){ 
            alert('Access deined')
        }else{
                sessionStorage['id'] = res.id 
                sessionStorage['admin'] = res.admin
                sessionStorage['letAcsses'] = res.letAcsses
                sessionStorage['permissions'] = res.permissions
                sessionStorage['sessionTimeOut'] = new Date().getTime() + res.sessionTimeOut
                navigate('/home')
           }
        }

    return (
        <div>
            <h1>Movies-Subscription web site</h1>
            <h3>Log in Page</h3>
            Username:<input type={'text'} onChange={(e) => setUsername(e.target.value)}/><br/>
            Password:<input type="password" onChange={(e) => setPassword(e.target.value)}/><br/>
            <button onClick={send}>Login</button><br/>
            New User? <a href='/createaccount'>Create Account</a>
        </div>
    )
}
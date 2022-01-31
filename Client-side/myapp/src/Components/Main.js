import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import CreateAccount from './CreateAccount'
import LogIn from './Login'
import Container from './Container'


export default function Main() {

    return (
    <div>
            <Routes>  
                <Route path='/' element={<LogIn/>}/>      
                <Route path='/home/*' element={<Container/>}/>
                <Route path='/createaccount' element={<CreateAccount/>}/>
            </Routes>
    </div>
    )
}

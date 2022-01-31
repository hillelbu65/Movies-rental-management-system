import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { addUserPassword } from '../DAL/CrreateAccountDal'

export default function CreateAccount() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    //Submit the form of create account. 
    const submit = async (e) => {
        e.preventDefault()

        //Check  if all the fields are valid. if so send the new password to the server.
        if(username == '' || password == ''){
            alert('All fields are mandatory!')
        }else{
            const response = await ( await addUserPassword({username, password})).data
            if(response.created){
                alert('User added')
            }else{
                alert('Creation Error')
            }
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <h3>Create Account</h3>
                User Name: <input type="text" onChange={(e)=>setUsername(e.target.value)}/><br/>
                Password: <input type="password" onChange={(e)=>setPassword(e.target.value)}/><br/>
                <button type='submit'>Create</button><br/>
                <button onClick={() => navigate('/')}>Login</button>
            </form>
        </div>
    )
}

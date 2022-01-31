import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addMember } from '../../DAL/MembersDal';

export default function AddMember() {
    const navigate = useNavigate()

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')


    //Submit  the add user form.
    const submit = async (e) => {
        e.preventDefault()

        //Check if all field are valid. if sow send the new member data to the server.
        if(fname != '' && email != '' && city != ''){
        const newMember = {
            name: `${fname} ${lname}`, 
            email: email,
            city: city
        }
        
        const response = await (await addMember(newMember)).data
        if(response.added){
            alert('Added')
        }else{
            alert('Error')
        }
        }else{
            alert('All fuelds are mandory')
        }
    }

  return( 
        <div>
            <h1>Add Member</h1>
            <form onSubmit={submit}>
                <input type='text' placeholder='First name' value={fname} onChange={(e) => setFname(e.target.value)}/><br/>
                <input type='text' placeholder='Last name' value={lname} onChange={(e) => setLname(e.target.value)}/><br/>
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <input type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)}/><br/>
                <button type='submit'>Save</button>
            </form>
            <button onClick={() => navigate(-1)}>Cansel</button>
        </div>
        ); 
}
 
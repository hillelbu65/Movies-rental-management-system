import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteMember, getMemberById, updateMember } from '../../DAL/MembersDal';

export default function EditMember() {
    const {id} = useParams('id')
    const navigate =  useNavigate()

    const [name,  setName] =useState('')
    const [email,  setEmail] =useState('')
    const [city,  setCity] =useState('')
    const [titleName, setTitleName] = useState('')

    //Get the member data and put the data in state to display in the form.
    useEffect( async () => {
        const response = await (await getMemberById(id)).data
        setName(response.name)
        setCity(response.city)
        setEmail(response.email)
        setTitleName(response.name)
    }, [])

    //Submit the update user form.
    const submit = async (e) => {
        e.preventDefault()

        //Check if all the fields are valid if so send the form data to the server.
        if(name !=''&& email != '' && city != ''){
            const newMember = {
                name: name,
                email: email,
                city: city
            }
            const response = await (await updateMember(id, newMember)).data
            if(response){
                alert("Updete")
                navigate(-1)
            }else{
                alert('Error')
            }
        }else{
            alert('All fields are mandtorys')
        }
    }

    const cansel = () => {
        navigate(-1)
    }

  return (
    <div>
        <h4>Edit member : {titleName}</h4> 
        <form onSubmit={submit}>
            Name: <input type='text' value={name} onChange={(e) => setName(e.target.value)}/><br/>
            Email: <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
            City: <input type='text' value={city} onChange={(e) => setCity(e.target.value)}/><br/>
            <button type='submit'>Save</button>
        </form>
        <br/>
        <button onClick={cansel}>Cansel</button>
    </div>
  )
}

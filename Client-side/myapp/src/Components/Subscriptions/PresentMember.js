import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getMemberById } from '../../DAL/MembersDal';
import { StateApp } from '../GlobalState';
import Member from './Member';

export default function PresentMember() {
    const navigate = useNavigate()

    const[ [reloadData, setReloadData] ] = useContext(StateApp)

    const {id} = useParams()
    const [member, setMember] = useState([])


    //loads the chosen member's data to state and display acoordingly
    useEffect( async () => {
        const member = await (await getMemberById(id)).data
        setMember(member)
        setReloadData(Math.random())
    }, [])

  return (
    <div>
       <center><Member memberData={member}/></center>
       <button onClick={() => navigate(-1)}>Back</button>
        <div style={{height: '200px', width: '100%'}}></div>
    </div>);
}

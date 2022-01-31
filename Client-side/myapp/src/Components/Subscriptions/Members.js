import React, { useContext, useEffect, useState } from 'react'
import { getAllMembers } from '../../DAL/MembersDal'
import Member from './Member'
import '../Style/Members.css'
import { StateApp } from '../GlobalState'

export default function Members(){
    const [members, setMembers] = useState([])

    const [ [reloadData, setReloadData] ] = useContext(StateApp)
    // Get all the members as alist and put them in state.
    useEffect( async () => {
        const allMembers = await (await getAllMembers()).data
        setMembers(allMembers)

    }, [reloadData])

        //Repeater - create list of members components to display.
        const member = members.map((member, index) => { 
            return(
            <Member key={index} memberData={member}/>
            )})

    return (
        <div className='main'>
            <div className='slider'>
                {member}
            </div>
        </div>
    )
}

import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { deleteMember } from '../../DAL/MembersDal'
import { deleteSubscription, getAllsubscriptions } from '../../DAL/SubscriptionsDal'
import { StateApp } from '../GlobalState'
import MoviesWached from '../Movies/MoviesWatched'
import '../Style/Members.css'
import '../Style/buttons.css'

export default function Member(props) {
    const navigate =  useNavigate()
    
    const[ [reloadDataa, setReloadData] ] = useContext(StateApp)

    const edit = () => {
        navigate(`/home/editmember/${props.memberData._id}`)
    }


    //Delete all the member data from all the relvant data resorcess.
    const deleteMe = async () => {
        const response = await (await deleteMember(props.memberData._id)).data
        const allSubscriptions = await (await getAllsubscriptions()).data
        const sub = allSubscriptions.find(sub => sub.memberId == props.memberData._id)
        if(sub)
        {
            const subscriptionID = sub._id
            const deleteSub = await (await deleteSubscription(subscriptionID)).data
        }
        setReloadData(props.memberData._id)
    }

     return (
        <div className='sliderBox' style={{ 
            width: '400px', 
            margin: '10px', backgroundColor: '#F2D5A6', 
            borderRadius: '10px',
            padding: '5px'}}>

            <h2>{props.memberData.name}</h2><br/>
            Email:{props.memberData.email}<br/>
            City: {props.memberData.city}<br/><br/>
            {sessionStorage['permissions'].includes('UpdateSubscriptions') ?
                <button className='button' onClick={edit}>Edit</button>: null}
                {sessionStorage['permissions'].includes('DeleteSubscriptions') ? 
                <button className='button' onClick={deleteMe}>Delete</button>: null}
            <br/><br/>
            <MoviesWached memberData={props.memberData}/>
        </div>
    )   
}

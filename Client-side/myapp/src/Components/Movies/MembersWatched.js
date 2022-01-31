import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAllMembers } from '../../DAL/MembersDal';
import { fixDate } from '../../Utils/DateUtils';

export default function MembersWached(props) {
    const navigate = useNavigate()

    const [listOfMembers, setList] = useState([])

    //Put a list of all members that wached this specific movie in state.
    useEffect( async () => {
        const list = []
        const movieId = props.MovieData._id
        const subsThisMovie =  [...props.MovieData.subscribers]

        const allMembers = await (await getAllMembers()).data
        subsThisMovie.forEach(sub => {
           const movieDate = sub.movies.find(mov => mov.movieId == movieId).date
           
           if(movieDate){
            const memberData = allMembers.find(member => member._id == sub.memberId)
            const memberName = memberData.name
            const memberId= memberData._id
            list.push({memberId: memberId, membername: memberName, date: movieDate})
           }
        })
        setList(list)
    }, [props])

    //repeter of the members list that watched the spasefic movie to present them.
    const data = listOfMembers.map((member, index) => {
        return(
            <a onClick={() => {
                navigate(`/home/presentMember/${member.memberId}`)}}><li key={index}>{`${member.membername}  ${fixDate(member.date)}`}</li></a>
        )
    })

  return( <div>
      <ul>
          {data}
      </ul>
  </div>);
}

import { getAllMembers } from "../DAL/MembersDal"
import { getAllMovies, getMovieById } from "../DAL/MoviesDAL"
import { addSubscription, getAllsubscriptions, getSubscriptionById, updateSubscription } from "../DAL/SubscriptionsDal"
import { fixDate } from "./DateUtils"
import { GetSubscriptionById } from "./SubscriptionsUtils"

//Get all the members and the movies data to convert the movies id's in the subscription objects to movie's name's
const moviesWached = async (id) => {
    const subscriptions= await (await getAllsubscriptions()).data
    const movies = await (await getAllMovies()).data

    const sub = subscriptions.find(subs => subs.memberId == id)
    //If the subscripit 
    if(sub != undefined){
    const list = sub.movies.map(mov => {
    const movieData = movies.find(movie => movie._id == mov.movieId)
    const movieName = movieData.name
        return (
            {
            name: movieName, date: fixDate(mov.date) 
            }
            )
        }) 
        return list
    }else{
        return []
    }
}

//Get all movies and members and data shape them. 
const getMoviesAllData = async () => {
    const response = await (await getAllMovies()).data
        const allMembers = await (await getAllMembers()).data

        const moviesToState = []
        response.forEach( async (movie) => {
            const tempMembers = []
            movie.subscribers.forEach(sub => {
                const filterMembers = allMembers.find(member => member._id == sub.memberId)
                tempMembers.push(filterMembers)
            })

            moviesToState.push(
                {
                _id: movie._id,
                name: movie.name,
                genres: movie.genres,
                image: movie.image,       
                premiered: movie.premiered,
                subscribers: movie.subscribers,
                members: tempMembers
                }   
            )
        })

        return moviesToState
}

//Get all  the subscriptions and put the new subscription  to the movies array in the subscription object.
const addSubscriptionData = async (memberId, movieId, date) => {
    const allSubscriptions = await (await getAllsubscriptions()).data

    if(allSubscriptions.find(sub => sub.memberId == memberId)){
        
        //arrange movies that the subscriber watched to dispaly their name and date accordingly
        const sub = await GetSubscriptionById(memberId)
        const idSubDB  = sub._id
        const updatedSub = { movies: [...sub.movies,{ movieId: movieId, date: new Date(date) }]}
        const updeteSub = updateSubscription(idSubDB, updatedSub) 
        return updeteSub
    }else{
        
        //if the subscriber is new, he\she are added to the database
        const newSub = {
            memberId: memberId,
            movies: [{movieId: movieId, date: new Date(date)}]
        }
        const addsub = await (await addSubscription(newSub)).data
        return addsub
    }
}


export {moviesWached, getMoviesAllData, addSubscriptionData}


import React from 'react'
import { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import AddMovie from './Movies/AddMovie'
import AddUser from '../Components/UserMangment/AddUser'
import EditMovie from './Movies/EditMovie'
import EditUser from './UserMangment/EditUser'
import { StateApp } from './GlobalState'
import Movies from './Movies/Movies'
import MovisePage from './Movies/MoviesPage'
import Subscriptions from './Subscriptions/Subscriptions'
import Users from './UserMangment/Users'
import UsersMangment from './UserMangment/UsersMangment'
import Members from './Subscriptions/Members'
import EditMember from './Subscriptions/EditMember'
import { FiYoutube, FiUsers, FiLogOut, FiDatabase} from "react-icons/fi";
import './Style/Container.css'
import AddMember from './Subscriptions/AddMember'
import PresentMember from './Subscriptions/PresentMember'


export default function Container() {
    const navigate = useNavigate()

    const   
    [
         
        [reloadData, setReloadData], 
        [searchStringToProps, setSearchStringToProps]

    ] = useContext(StateApp)

    //check the sessionTimeOut after login.
    setInterval(() => {
        //if the current date in milisocends is bigger than login date + sessionTimeOut, then logOut.
        if(+sessionStorage['sessionTimeOut'] < new Date().getTime()){
            navigate('/')
        }
    }, 0);

    //check the sessionStorage.
    if(sessionStorage['letAcsses'] == 'false' || sessionStorage['letAcsses'] == undefined){
       navigate('/') 
    }

        const moviesPage = () => {
            setSearchStringToProps('')
            navigate('moviespage/movies')
        }

        const usersMangment  = () => {
            ('mangment')
                navigate('usersmangment/users')
        }

        const subscriptions = () => {
            navigate('/home/subscriptions/members')
        }
        

        //If logout button is clicked so logout and...
        const logOut = () => {
            sessionStorage['id'] = false //false
            sessionStorage['admin'] = false //false
            sessionStorage['letAcsses'] = false //false
            sessionStorage['permissions'] = false //false
            sessionStorage['sessionTimeOut'] = false //false
            navigate('/')
        }
        


    return (
        <div>
            <h1>Movies-Subscription web site</h1>
            
            <div className='containerNavBar'>
                <div className='navBar'>
                    {sessionStorage['permissions'].includes('ViewMovies')?<button style={{padding: '0px', margin: '0px', marginLeft: '40px', marginTop: '10px'}} className='leftButton' onClick= {moviesPage}><FiYoutube color='#562C2C' size={'25px'}/></button>: null}
                    {sessionStorage['permissions'].includes('ViewSubscriptions')? <button style={{padding: '0px', margin: '0px', marginLeft: '40px', marginTop: '10px'}} className='button' onClick={subscriptions}><FiUsers color='#562C2C' size={'25px'}/></button>: null}
                    {sessionStorage['admin'] == 'true' ?<button style={{padding: '0px', margin: '0px', marginLeft: '40px', marginTop: '10px'}} className='button' onClick={usersMangment}><FiDatabase color='#562C2C' size={'25px'}/></button>:null}
                    <button style={{padding: '0px', margin: '0px', marginLeft: '40px', marginTop: '10px'}} className='button' onClick={logOut}><FiLogOut color='#562C2C' size={'25px'}/></button>
                </div>
            </div>

            <Routes>
                <Route path='/moviespage' element={<MovisePage />}>
                    <Route path='add_movie' element={<AddMovie/>}/>
                    <Route path='movies' element={<Movies/>}/>
                </Route>
                <Route path='/usersmangment' element={<UsersMangment />}>
                    <Route path='users' element={<Users/>}/>
                    <Route path='adduser' element={<AddUser/>}/>
                </Route>
                <Route path='edituser/:id' element={<EditUser/>}/>
                <Route path='editmovie/:id' element={<EditMovie/>}/>
                <Route path='/subscriptions' element={<Subscriptions/>}>
                    <Route path='members' element={<Members/>}/>
                    <Route path='add_member' element={<AddMember/>}/>
                </Route>
                <Route path='editmember/:id' element={<EditMember/>}/>
                <Route path='presentMember/:id' element={<PresentMember/>}/>
            </Routes>
        </div>
    )
}

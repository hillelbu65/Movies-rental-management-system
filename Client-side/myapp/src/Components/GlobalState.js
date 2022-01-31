import {createContext, useState } from "react"

export const StateApp = createContext() 

export const  GlobalStateProvider = (props) => 
{
    //If the get change I'll trigger sum code on demand. I'm just a tool.
    const [reloadData, setReloadData] = useState('')
    const [searchStringToProps, setSearchStringToProps] = useState('')

    return ( 
        <StateApp.Provider value = {[ 
            [reloadData, setReloadData], 
            [searchStringToProps, setSearchStringToProps],
            ]}>
            {props.children}
        </StateApp.Provider>
    )
}

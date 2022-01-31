import React from 'react'
import { GlobalStateProvider } from './GlobalState'
import Main from './Main'

export default function HostComp() {
    return (
        <div>
            <GlobalStateProvider>
                <Main/>
            </GlobalStateProvider>
        </div>
    )
}

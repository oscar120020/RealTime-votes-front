import React from 'react'
import { SocketProvider } from './context/SocketContext'
import HomePage from './HomePage'

export const BandApp = () => {
    return (
        <SocketProvider>
            <HomePage/>
        </SocketProvider>
    )
}

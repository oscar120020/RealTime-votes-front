import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandAdd = () => {

    const [name, setName] = useState("")
    const {socket} = useContext(SocketContext)

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name.length > 0){
            socket.emit("add-band", name)
            setName("")
        }
    }

    return (
        <>
            <h3>Add a new band</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" value={name} onChange={handleChange} placeholder="band name"/>
            </form>
        </>
    )
}

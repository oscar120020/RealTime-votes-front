import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {

  const {socket} = useContext(SocketContext)

  const [bands, setBands] = useState([])

  const voted = (id) => {
    socket.emit("votar", {id})
  }

  const borrar = (id) => {
    socket.emit("borrar", {id})
  }

  useEffect(() => {
    socket.on("current-bands", (data) =>{
      setBands(data)
    })
  }, [socket])

  const handleNameChange = (e, id) => {
    const newName = e.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const handleBlur = (name, id) => {
    socket.emit("change-name", {id, name})
  };

  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => voted(band.id)}>+1</button>
        </td>
        <td>
          <input
            type="text"
            value={band.name}
            className="form-control"
            onChange={(e) => handleNameChange(e, band.id)}
            onBlur={(e) => handleBlur(e.target.value, band.id)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => borrar(band.id)} >Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};

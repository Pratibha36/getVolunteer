import React from 'react'
import './error.css'

export default function Error(props) {
    console.log("error called",props)
  return (
    <div className="box">
      <div className="heading">Errors!!</div>
      <div className="messageBox">{JSON.stringify(props)}</div>
      <div className="closeButton" onClick={()=>{props.handleClose()}}>Close</div>
    </div>
  )
}
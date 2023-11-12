import React, { useEffect } from 'react'
import "./student.css"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { color } from '@chakra-ui/react';

const Student = (props) => {
  // useEffect(()=>{

  // },[])

  const onAction=async(status)=>{
    try {
      const notificationValue=status=="accepted"?`your application ${props.applicationId} has been accepted.`:`your application ${props.applicationId} has been rejected.`
      const response = await fetch("http://localhost:8000/application/"+props.applicationId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notification:true,
          notificationValue:notificationValue,
          status: status,

        }),
        credentials: "include",
      });
      // console.log(response)
      const responseData = await response.json();
      if (response.ok) {
        props.getApplication();
        console.log(responseData)
      } else {
        // const errorData = await response.json();
        window.alert(responseData.message);
      }
    } catch (error) {
      // console.log(error)
    }
  }

  return (
    <div>
        <ToastContainer />
        <div className='student'>
        
            <img alt='profilelogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkwiruafD-4A_k3Pq1s0qLoLzRP5LENJ8qFA&usqp=CAU' />
            <div className='student__details'>
                <p>Name:   {props.name} </p>
                <p>Gender: {props.gender}</p>
                <p>Program: {props.program}</p>
                <p>Department: {props.department}</p>
                <p>Semester: {props.semester}</p>
            </div>
            <div className='student__aprrejbtn'>
                {props.status==="pending" && <button onClick={()=>onAction("accepted")} className="student__apr">Accept</button>}
                {props.status==="accepted" && <p style={{color:"green",fontSize:"30px",fontWeight:"bold", margin:"auto"}}>Accepted</p>}
                {props.status==="rejected" && <p style={{color:"red",fontSize:"30px",fontWeight:"bold", margin:"auto"}}>Rejected</p>}
                {props.status==="pending" && <button onClick={()=>onAction("rejected")} className="student__rej">Reject</button>}
            </div>
            </div>
    </div>
  )
}

export default Student
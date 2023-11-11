import React, { useEffect } from 'react'
import "./student.css"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Student = (props) => {
  // useEffect(()=>{

  // },[])

  const onAction=async(status)=>{
    try {
      const response = await fetch("http://localhost:8000/application/"+props.applicationId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status
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
            <div>
                <p>Name: {props.name} </p>
                <p>Gender: {props.gender}</p>
                <p>Program: {props.program}</p>
                <p>Department: {props.department}</p>
                <p>Semester: {props.semester}</p>
            </div>
            <div className='student__aprrejbtn'>
                <button onClick={()=>onAction("accepted")} className={props.status=="peding" ? "disabled" : "student__apr"}>Accept</button>
                <button onClick={()=>onAction("rejected")} className={props.status=="peding" ? "disabled" : "student__rej"}>Reject</button>
            </div>
            </div>
    </div>
  )
}

export default Student
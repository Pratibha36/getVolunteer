import React from 'react'
import "./student.css"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Student = () => {
  const onapply=()=>{
    toast("congratulation");
  }  
  return (
    <div>
        <ToastContainer />
        <div className='student'>
        
            <img alt='profilelogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkwiruafD-4A_k3Pq1s0qLoLzRP5LENJ8qFA&usqp=CAU' />
            <div>
                <p>Name: Neeraj Sharma</p>
                <p>Gender: Male</p>
                <p>Program: Mtech</p>
                <p>Branch: CSE</p>
                <p>Semester: 1</p>
            </div>
            <div className='student__aprrejbtn'>
                <button onClick={onapply} className='student__apr'>Approve</button>
                <button className='student__rej'>Reject</button>
            </div>
            </div>
    </div>
  )
}

export default Student
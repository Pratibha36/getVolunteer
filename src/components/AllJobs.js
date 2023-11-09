import React from 'react'
import './alljobs.css'
import { Job } from './Job'
import { useAuthStateValue } from '../context/AuthStateProvider'

const AllJobs = () => {
  const [{user},authdispatch]=useAuthStateValue();
  return (
    user && user.userType==="faculty"?<div>
      <div className='myjobs'>
      <h1>
        My Posted Jobs
    </h1>
      </div>
    </div>:
    (<div className='alljobs' >
    <h1>
        All Jobs
    </h1>
    <Job/>
    <Job/>
    <Job/>
    <Job/>
    </div>)
  )
}

export default AllJobs
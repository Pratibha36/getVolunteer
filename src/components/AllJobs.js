import React from 'react'
import './alljobs.css'
import { Job } from './Job'
import { useAuthStateValue } from '../context/AuthStateProvider'
import { useEffect } from 'react'
import { useState } from 'react'
import { Pagination } from './Pagination'
import { Oval } from 'react-loader-spinner'

const AllJobs = () => {
  const [{ user }, authdispatch] = useAuthStateValue();
  const [resjob, setresjob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curentPage,setCurrentPage]=useState(1);
  const [postPerPage,setPostPerPage]=useState(4);
  useEffect(() => {
    fetchAllJobs();
  }, [])
  const lastPostIndex=curentPage*postPerPage;
  const firstPostIndex=lastPostIndex-postPerPage;
  const currentPost=resjob.slice(firstPostIndex,lastPostIndex);
 

  const fetchAllJobs = async () => {
    try {
      const apiUrl = 'http://localhost:8000/job'; // Replace with your API URL
      // Use the fetch API with async/await
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: 'include'
      });
      if (!response.ok) {
        setLoading(true);
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData)
      setresjob(responseData);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  return (
    user && user.userType === "faculty" ? (
      <div id='jobs'>
        
        <div className='myjobs'>
          <h1>
            My Posted Jobs
          </h1>
          <Pagination totalPosts={resjob.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={curentPage} />
          {loading ? (
              <Oval
                height={80}
                width={80}
                color="#4fa94d"
                visible={true}
                ariaLabel="oval-loading"
              />
            ) : (
              currentPost.map((j) => {
                return <Job {...j} />;
              })
            )}
        </div>
      </div>) :
      (<div  className='alljobs' >
        <h1>
          All Jobs
        </h1>
        <Pagination totalPosts={resjob.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={curentPage} />
        {loading ? (
            <Oval
              height={80}
              width={80}
              color="#013AA7"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#013AA7"
            />
          ) : (
            currentPost.map((j) => {
              console.log(j);
              return <Job {...j} />;
            })
          )}
      </div>)
  )
}

export default AllJobs
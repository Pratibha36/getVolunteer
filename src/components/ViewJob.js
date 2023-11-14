import React from "react";
import "./viewjob.css";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import CalendarTodayTwoToneIcon from "@mui/icons-material/CalendarTodayTwoTone";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useEffect } from "react";
import { useState } from "react";
import { isoToDate } from "../funtions/Function";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StatePovider';

import { StudentList } from "./StudentList";
import { useAuthStateValue } from "../context/AuthStateProvider";

const ViewJob = ({ }) => {
  const navigate = useNavigate();
  const htmlelem = "<h1>hi<h1>";
  const [{ user }, authdispatch] = useAuthStateValue();
  const [{ openloginmodal, iserror, errorMessage }, dipatch] = useStateValue();
  const [jobDetails, setJobDetails] = useState(null);
  const [facultyDetails, setFacultyDetails] = useState(null);
  // const [applied, setApplied] = useState(false);
  const [application, setApplication] = useState(null);
  const { jobid } = useParams();
  useEffect(() => {
    // if (!user) navigate('/');
    fetchJobWithId();
    checkApplied();
  }, [user]);
  console.log(jobid)

  const fetchFacultyDetails = async (facultyId) => {
    try {
      const response = await fetch("http://localhost:8000/user/" + facultyId, {
        method: "GET",
        credentials: "include",
      });
      const responseData = await response.json();
      if (!response.ok) {
        dipatch({
          type: "SHOW_ERROR",
          payload: responseData
        })
      }
      else {
        setFacultyDetails(responseData);
      }
    }
    catch (error) {
      dipatch({
        type: "SHOW_ERROR",
        payload: { 'error': `Error fetching faculty data: ${error.message}` }
      })
    }
  };
  const checkApplied = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/application/applied/" + jobid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/jfson",
          },
          credentials: "include",
        }
      );
      const responseData = await response.json()
      if (response.ok) {
        console.log(responseData);
        if (responseData.success) {
          setApplication(responseData.application)
        }
      }
      else {
        dipatch({
          type: "SHOW_ERROR",
          payload: responseData
        })
      }
    } catch (error) {
      dipatch({
        type: "SHOW_ERROR",
        payload: { 'error': `Error fetching chekck appliec data: ${error.message}` }
      })
    }
  };
  const onApply = async () => {
    try {
      const response = await fetch("http://localhost:8000/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: jobid,
        }),
        credentials: "include",
      });
      // console.log(response)
      const responseData = await response.json();
      if (response.ok) {
        checkApplied();
        fetchJobWithId();
      } else {
        dipatch({
          type: "SHOW_ERROR",
          payload: responseData
        })
      }
    } catch (error) {
      dipatch({
        type: "SHOW_ERROR",
        payload: { 'error': `Error applying job: ${error.message}` }
      })
    }
  };

  const onWithdraw = async () => {
    try {
      const response = await fetch("http://localhost:8000/application/" + application._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "withdrawn"
        }),
        credentials: "include",
      });
      // console.log(response)
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData)
        checkApplied();
        fetchJobWithId();
      }
      else {
        // const errorData = await response.json();
        // window.alert(responseData);
        dipatch({
          type: "SHOW_ERROR",
          payload: responseData
        })
      }
    } catch (error) {
      dipatch({
        type: "SHOW_ERROR",
        payload: { 'error': `Error in withdraw data: ${error.message}` }
      })
    }
  }


  const fetchJobWithId = async () => {
    try {
      const apiUrl = "http://localhost:8000/job/" + jobid; 
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
      });
      const responseData = await response.json()
      if (!response.ok) {
        dipatch({
          type: "SHOW_ERROR",
          payload: responseData
        })
      }
      else {
        setJobDetails(responseData);
        fetchFacultyDetails(responseData.facultyId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      dipatch({
        type: "SHOW_ERROR",
        payload: {'error':`Error fetching job data: ${error.message}`}
      })
    }
  };

  return (jobDetails && facultyDetails &&
    <div className={`{viewjob ${iserror ? 'blur' : ''}`}>
      <div className='viewjob__items'>
        <div className='viewjobcard'>
          <div className='view_jobimgadj'>
            <div>
              <p className='viewjobcard__heading'>
                {jobDetails.heading}
              </p>
              <p className='viewjob__person'>{facultyDetails.name}</p>
              <div className='viewjob__date'>
                <CalendarMonthTwoToneIcon />
                <p style={{ paddingRight: '90px' }}>Job Start date: {isoToDate(jobDetails.startingDate)}</p><pre />
                <CalendarTodayTwoToneIcon />
                <p >Job End date: {isoToDate(jobDetails.endingDate)}</p>
              </div>
              <div className='viewjob__date'>
                <DateRangeIcon />
                <p style={{ paddingRight: '30px' }}>Registration Start date: {isoToDate(jobDetails.registrationStartingDate)}</p>
                <CalendarTodayTwoToneIcon />
                <p>Registration End date: {isoToDate(jobDetails.registrationEndingDate)}</p>
              </div>
              <div className='viewjob_loc'>
                <LocationOnTwoToneIcon /> <p>{jobDetails.location}</p>
              </div>
            </div>
            <img alt='job logo' src='https://img.naukimg.com/logo_images/groups/v1/6015371.gif' />
          </div>
          <hr />
          <div className='viewjob__details'>
            <p style={{ paddingRight: "10px" }}><span style={{ color: "rgb(101, 99, 99)" }}>Posted on:</span> {isoToDate(jobDetails.postDate)} </p>
            <p style={{ paddingRight: "10px" }}><span style={{ color: "rgb(101, 99, 99)" }}>Openings:</span> 10</p>
            <p style={{ paddingRight: "10px" }}><span style={{ color: "rgb(101, 99, 99)" }}>Applicants:</span> {jobDetails.applicant}</p>
            {user.userType === "student" && !application && <button className="viewjob__button" onClick={() => onApply()}>Apply Now</button>}
            {user.userType === "student" && application && (["pending", "accepted"].includes(application.status)) && <button className="viewjobwithdraw__button" onClick={() => onWithdraw()}>Withdraw</button>}
            {user.userType === "student" && application && (["withdrawn", "rejected"].includes(application.status)) && <button className="dis" onClick={null}>Withdraw</button>}
          </div>
        </div>
        <div className='viewjobcard_desc'>
          <div dangerouslySetInnerHTML={{ __html: jobDetails.description }} />
        </div>
      </div>
      {user.userType === "faculty" && <div>
        <StudentList jobId={jobid} />
      </div>}
    </div>
  )
    ;
};

export default ViewJob;

import React, { useEffect, useState } from 'react';
import { useAuthStateValue } from '../context/AuthStateProvider';
import { Navigate } from 'react-router-dom';

function Signup() {
  const [userType, setUserType] = useState('');
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    password:'',
    contact: '',
    personId: '',
    gender: 'Male',
    department: '',
    program: '',
    semester: '',
  });
  const [facultyData, setFacultyData] = useState({
    name: '',
    email: '',
    password:'',
    contact: '',
    personId: '',
    gender: 'Male',
    department: '',
    areaOfInterest: '',
  });
  const [{user},dispatch]=useAuthStateValue();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleInputChange = (e, field, subField) => {
    if (field === 'student') {
      setStudentData({
        ...studentData,
        [subField]: e.target.value,
      });
    } else if (field === 'faculty') {
      setFacultyData({
        ...facultyData,
        [subField]: e.target.value,
      });
    }
  };

  // useEffect(()=>{

  // })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const user = {
      userType: userType,
      ...(userType === 'student' ? studentData : facultyData),
    };

    try {
      console.log(user);
      // Send POST request to your server
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({type:"LOGIN",payload:data})
        setLoading(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setLoading(false);
        console.log(errorData)
      }
    } catch (error) { 
      setError('An error occurred while processing your request.');
      console.log(error)
      setLoading(false);
    }
  };

  return (
    !user ?
    <div>

      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select User Type:
          <select onChange={handleUserTypeChange} value={userType}>
            <option value="">-- Select User Type --</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </label>

        {userType === 'student' && (
          <div>
            <label>
              Student Name:
              <input
                type="text"
                value={studentData.name}
                onChange={(e) => handleInputChange(e, 'student', 'name')}
              />
            </label>
            <label>
              Student Email:
              <input
                type="email"
                value={studentData.email}
                onChange={(e) => handleInputChange(e, 'student', 'email')}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={studentData.password}
                onChange={(e) => handleInputChange(e, 'student', 'password')}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                value={studentData.contact}
                onChange={(e) => handleInputChange(e, 'student', 'contact')}
              />
            </label>
            <label>
              Roll Number:
              <input
                type="text"
                value={studentData.personId}
                onChange={(e) => handleInputChange(e, 'student', 'personId')}
              />
            </label>
            <label>
              Gender:
              <div>
                <label>
                  <input
                    type="radio"
                    value="Male"
                    checked={studentData.gender === 'Male'}
                    onChange={(e) => handleInputChange(e, 'student', 'gender')}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={studentData.gender === 'Female'}
                    onChange={(e) => handleInputChange(e, 'student', 'gender')}
                  />
                  Female
                </label>
              </div>
            </label>
            <label>
              Department:
              <select
                value={studentData.department}
                onChange={(e) => handleInputChange(e, 'student', 'department')}
              >
                <option value="">-- Select Department --</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                {/* Add more departments as needed */}
              </select>
            </label>
            <label>
              Program:
              <select
                value={studentData.program}
                onChange={(e) => handleInputChange(e, 'student', 'program')}
              >
                <option value="">-- Select Program --</option>
                <option value="M.Tech">M.Tech</option>
                <option value="B.Tech">B.Tech</option>
              </select>
            </label>
            <label>
              Semester:
              <select
                value={studentData.semester}
                onChange={(e) => handleInputChange(e, 'student', 'semester')}
              >
                <option value="">-- Select Semester --</option>
                {studentData.program === 'B.Tech' ? (
                  <>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </>
                ) : studentData.program === 'M.Tech' ? (
                  <>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </>
                ) : null}
              </select>
            </label>
          </div>
        )}

        {userType === 'faculty' && (
          <div>
            <label>
              Faculty Name:
              <input
                type="text"
                value={facultyData.name}
                onChange={(e) => handleInputChange(e, 'faculty', 'name')}
              />
            </label>
            <label>
              Faculty Email:
              <input
                type="email"
                value={facultyData.email}
                onChange={(e) => handleInputChange(e, 'faculty', 'email')}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={facultyData.password}
                onChange={(e) => handleInputChange(e, 'faculty', 'password')}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                value={facultyData.contact}
                onChange={(e) => handleInputChange(e, 'faculty', 'contact')}
              />
            </label>
            <label>
              Faculty ID:
              <input
                type="text"
                value={facultyData.personId}
                onChange={(e) => handleInputChange(e, 'faculty', 'personId')}
              />
            </label>
            <label>
              Gender:
              <div>
                <label>
                  <input
                    type="radio"
                    value="Male"
                    checked={facultyData.gender === 'Male'}
                    onChange={(e) => handleInputChange(e, 'faculty', 'gender')}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={facultyData.gender === 'Female'}
                    onChange={(e) => handleInputChange(e, 'faculty', 'gender')}
                  />
                  Female
                </label>
              </div>
            </label>
            <label>
              Department:
              <select
                value={facultyData.department}
                onChange={(e) => handleInputChange(e, 'faculty', 'department')}
              >
                <option value="">-- Select Department --</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                {/* Add more departments as needed */}
              </select>
            </label>
            <label>
              Area of Interest:
              <textarea
                value={facultyData.areaOfInterest}
                onChange={(e) => handleInputChange(e, 'faculty', 'areaOfInterest')}
              />
            </label>
          </div>
        )}

        <button type="submit">Submit</button>
        {error && <div>{error}</div>}
      </form>
    </div>
    : <Navigate to="/" replace={true} />
  );
}

export default Signup;

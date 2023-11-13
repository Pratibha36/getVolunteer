import React from 'react';
import './AdminTable.css'; // Import the CSS file

const AdminTable = ({ users,userData }) => {
  const onDeleteUser = (userId) => {
    // Add your delete logic here
  };
  const formatDate = (DateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const startDate = new Date(DateString);
    return startDate.toLocaleDateString('en-US', options);
  };
  let link;
  if(userData==="faculty"){
    link=(<table>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Roll Num</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.userId}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.contact}</td>
          <td>{user.personId}</td>
          <td>{user.gender}</td>
          <td>{user.department}</td>
          <td>
            <button className='admin_btn' onClick={() => onDeleteUser(user.userId)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table> ) 
  }else if(userData==="student"){
    link=(<table>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Roll Num</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Semester</th>
        <th>Program</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.userId}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.contact}</td>
          <td>{user.personId}</td>
          <td>{user.gender}</td>
          <td>{user.department}</td>
          <td>{user.semester}</td>
          <td>{user.program}</td>
          <td>
            <button className='admin_btn' onClick={() => onDeleteUser(user.userId)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>)

  }else if(userData==="job"){
    link=(<table>
    <thead>
      <tr>
        <th>Job ID</th>
        <th>Job Heading</th>
        <th>Job type</th>
        <th>Start date</th>
        <th>end date</th>
        <th>Registration Start date</th>
        <th>Registration end date</th>
        <th>Post Date</th>
        <th>Job status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.userId}>
          <td>{user._id}</td>
          <td>{user.heading}</td>
          <td>{user.type}</td>
          <td>{formatDate(user.startingDate)}</td>
          <td>{formatDate(user.endingDate)}</td>
          <td>{formatDate(user.registrationStartingDate)}</td>
          <td>{formatDate(user.registrationEndingDate)}</td>
          <td>{formatDate(user.postDate)}</td>
          <td>{user.status}</td>
          <td>
            <button className='admin_btn' style={{backgroundColor:"blue"}} onClick={() => onDeleteUser(user.userId)}>
              block Job
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>)
  }
  return link

};

export default AdminTable;

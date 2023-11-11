import React from 'react';

const AdminTable = ({ data, onDelete }) => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid black', background: '#f2f2f2' }}>
          <th style={{ padding: '8px' }}>Email</th>
          <th style={{ padding: '8px' }}>Phone Number</th>
          <th style={{ padding: '8px' }}>Gender</th>
          <th style={{ padding: '8px' }}>Department</th>
          <th style={{ padding: '8px' }}>Semester</th>
          <th style={{ padding: '8px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.userId} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '8px', textAlign: 'center' }}>{user.userEmail}</td>
            <td style={{ padding: '8px', textAlign: 'center' }}>{user.userPhoneNumber}</td>
            <td style={{ padding: '8px', textAlign: 'center' }}>{user.userGender}</td>
            <td style={{ padding: '8px', textAlign: 'center' }}>{user.userDepartment}</td>
            <td style={{ padding: '8px', textAlign: 'center' }}>{user.userSemester}</td>
            <td style={{ padding: '8px', textAlign: 'center' }}>
              <button onClick={() => onDelete(user.userId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;

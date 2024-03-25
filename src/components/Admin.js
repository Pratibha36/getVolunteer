import React, { useState } from 'react';
import {
    CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import AdminTable from './AdminTable';
import { useAuthStateValue } from '../context/AuthStateProvider'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from './Pagination';
  
const { Header, Sider, Content } = Layout;



const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState('1'); // Default active key
  const [{ user }, authdispatch] = useAuthStateValue();
  const [facuser,setfacuser]=useState([])
  const [studuser,setstuduser]=useState([])
  const [jobs,setJobs]=useState([]);
  const navigate = useNavigate();
  const [currentPageStudents, setCurrentPageStudents] = useState(1);
  const [postsPerPageStudents, setPostsPerPageStudents] = useState(7);
  
  const [currentPageFaculty, setCurrentPageFaculty] = useState(1);
  const [postsPerPageFaculty, setPostsPerPageFaculty] = useState(7);
  
  const [currentPageJobs, setCurrentPageJobs] = useState(1);
  const [postsPerPageJobs, setPostsPerPageJobs] = useState(7);
  
  const lastPostIndexStudents = currentPageStudents * postsPerPageStudents;
  const firstPostIndexStudents = lastPostIndexStudents - postsPerPageStudents;
  
  const lastPostIndexFaculty = currentPageFaculty * postsPerPageFaculty;
  const firstPostIndexFaculty = lastPostIndexFaculty - postsPerPageFaculty;
  
  const lastPostIndexJobs = currentPageJobs * postsPerPageJobs;
  const firstPostIndexJobs = lastPostIndexJobs - postsPerPageJobs;
  
  const currentStudentPosts = studuser.slice(firstPostIndexStudents, lastPostIndexStudents);
  const currentFacultyPosts = facuser.slice(firstPostIndexFaculty, lastPostIndexFaculty);
  const currentJobPosts = jobs.slice(firstPostIndexJobs, lastPostIndexJobs);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(()=>{
    console.clear();
    console.log(user);
    if(user==null){
      navigate("/")
    }else
      if(user && user.userType!="admin"){
      navigate("/");
    }else{
      getAllUser()
      getAllJobs()
    }
  },[])
  const logoutuser=async()=>{
    try {
      const apiUrl = 'http://localhost:8000/logout'
      // Use the fetch API with async/await
      const response = await fetch(apiUrl,{
        method:"GET",
        credentials: 'include'
      });

      if (!response.ok) {
        console.log('error in log out')
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if(response.ok){
        console.log(responseData)
        window.location.href = '/'
      }
     
    } catch (error) {
      console.error('Error in logout:', error);
    }     
  } 
  const handleMenuClick = ({ key }) => { 
    if (key === '4') {
    // Log out
    logoutuser();
    authdispatch({
      type:'LOGOUT'
    })
  } else {
    setActiveKey(key);
  }
  
  };
  const renderContent = () => {
    switch (activeKey) {
      case '1':
        return (
          <div>
            <Pagination
              totalPosts={studuser.length}
              postsPerPage={postsPerPageStudents}
              setCurrentPage={setCurrentPageStudents}
              currentPage={currentPageStudents}
            />
            <AdminTable
              users={currentStudentPosts}
              userData={"student"}
              getAllJobs={getAllJobs}
              getAllUser={getAllUser}
            />
          </div>
        );
      case '2':
        return (
          <div>
            <Pagination
              totalPosts={facuser.length}
              postsPerPage={postsPerPageFaculty}
              setCurrentPage={setCurrentPageFaculty}
              currentPage={currentPageFaculty}
            />
            <AdminTable
              users={currentFacultyPosts}
              userData={"faculty"}
              getAllJobs={getAllJobs}
              getAllUser={getAllUser}
            />
          </div>
        );
      case '3':
        return (
          <div>
            <Pagination
              totalPosts={jobs.length}
              postsPerPage={postsPerPageJobs}
              setCurrentPage={setCurrentPageJobs}
              currentPage={currentPageJobs}
            />
            <AdminTable
              users={currentJobPosts}
              userData={"job"}
              getAllJobs={getAllJobs}
              getAllUser={getAllUser}
            />
          </div>
        );
      case '4':
        break;
      default:
        return null;
    }
  };
  
  const getAllUser=async()=>{
    const apiUrl = 'http://localhost:8000/user';
    const response = await fetch(apiUrl, {
        method: "GET",
        credentials: 'include'
      });
      const responseData = await response.json();
      const studfilter=responseData.filter(user => user.userType ==="student");
      const facfilter=responseData.filter(user => user.userType ==="faculty");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setstuduser(studfilter)
      setfacuser(facfilter)
      
  }
  const getAllJobs=async()=>{
    const apiUrl = 'http://localhost:8000/job';
    const response = await fetch(apiUrl, {
        method: "GET",
        credentials: 'include'
      });
      const responseData = await response.json();
      console.log(responseData)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setJobs(responseData);
  }
  

  return ((user && user.userType==="admin" &&<div>
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'All Students',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'All Faculties',
            },
            {
              key: '3',
              icon: <CalendarOutlined />,
              label: 'All Jobs',
            },{
              key: '4',
              icon: <CalendarOutlined />,
              label: 'Log out',
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY: 'auto'
          }}
        >
            {renderContent()}
        </Content>
      </Layout>
    </Layout>
    </div>)
  );
};

export default Admin;

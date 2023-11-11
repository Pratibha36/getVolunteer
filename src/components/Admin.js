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
import { useEffect } from 'react';

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(()=>{
    getAllUser();
  },[])
  const getAllUser=async()=>{
    const apiUrl = 'http://localhost:8000/user';
    const response = await fetch(apiUrl, {
        method: "GET",
        credentials: 'include'
      });
      const responseData = await response.json();
      console.log(responseData)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      

  }
  return (
    <div>
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
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
            },
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
          }}
        >
           {/* {<AdminTable/>}  */}
        </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Admin;

import { Layout } from 'antd'
import React, { useState } from 'react'
import Sidebar from './sidebar'
const { Header, Sider, Content } = Layout;
import './index.less'

import { Outlet } from 'react-router-dom';
import HeaderBar from './headerBar';

const MLayout = () => {
  return (
    <Layout className="container">
      <Sidebar />
      <Layout className="site-layout">
        <HeaderBar />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MLayout
import { Breadcrumb, Layout } from "antd";
import React, { useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const HeaderBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation()


  /**
   * 面包屑
   */
  const pathSnippets = location.pathname.split('/').filter(i => i);
  console.log(pathSnippets, 'location');
   const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{url}</Link>
      </Breadcrumb.Item>
    );
  });
  
  return (
    <Header className="site-layout-header" style={{ padding: 0 }}>

        {/* 侧边栏折叠按钮 */}
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
      {/* 面包屑导航 */}
      <Breadcrumb>
        {breadcrumbItems}
      </Breadcrumb>
    </Header>
  );
};

export default HeaderBar;

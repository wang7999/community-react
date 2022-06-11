import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import React, { useState } from "react";
import { useStore } from "../../store";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { userStore } = useStore();
  const navgation = useNavigate();

  const menus = userStore.menus;
  console.log(menus, "menus");
  const onClick: MenuProps["onClick"] = (e) => {
    const path = e.keyPath.reverse().filter(item => !!item).join("/")
    console.log(path);
    
    navgation(`/${path}`, { replace: true });
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <h3>BBS管理系统</h3>
        
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menus}
        onClick={onClick}
      />
    </Sider>
  );
};

export default Sidebar;

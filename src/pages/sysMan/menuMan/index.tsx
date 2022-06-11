import { Card, Select, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { getAllApi } from "../../../api/base";
import ProTree from "../../../components/proTree";
import { MenuTypeOpts } from "../../../constant";
import { getTreeArr } from "../../../utils";
import DataPerms from "./dataPerms";
import "./index.less";
import MenuDetail from "./menuDetail";

const { TabPane } = Tabs;

const MenuMan = () => {
  const [treeData, setTreeData] = useState([]);
  const [currMenu, setCurrMenu] = useState<any>();
  const [menuList, setMenuList] = useState([]);
  const [currMenuType, setcurrMenuType] = useState(1);

  useEffect(() => {
    getAllApi("menu", { type: currMenuType }).then((res: any) => {
      const _treeData: any = getTreeArr({
        key: "id",
        pKey: "pid",
        data: res.content,
      });
      setTreeData(_treeData);
      // 匹配菜单的名称显示
      setMenuList(
        res.content.map((item: { name: any; id: any }) => ({
          label: item.name,
          value: item.id,
        }))
      );
    });
  }, [currMenuType]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const menuClick = (menu: any) => {
    console.log(menu);
    setCurrMenu(menu);
  };

  const menuTypeChange = (e: any) => {
    setcurrMenuType(e);
  };

  return (
    <div className="container">
      <div className="left-tree">
        {/* 菜单类型切换 */}
        <Select
          defaultValue={1}
          style={{ width: "100%" }}
          onChange={menuTypeChange}
          options={MenuTypeOpts}
        ></Select>
        <ProTree treeData={treeData} onClick={menuClick} />
      </div>
      <div className="right-content">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="菜单详情" key="1">
            <MenuDetail detail={currMenu} />
          </TabPane>
          {currMenu?.component === 1&&
          <TabPane tab="数据权限" key="2">
            <DataPerms menuList={menuList} currMenu={currMenu} />
          </TabPane>
          }
        </Tabs>
      </div>
    </div>
  );
};

export default MenuMan;

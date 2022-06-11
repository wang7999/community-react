import { ProDescriptions } from "@ant-design/pro-components";
import { Descriptions } from "antd";
import React from "react";
import { getAllApi } from "../../../api/base";
import { ComponentEnum, MenuTypeEnum } from "../../../constant/enum";

const MenuDetail = ({detail}: any) => {
  console.log(detail, 'detail');
  
  return (
    <ProDescriptions
      title="菜单详情"
      column={1}
      dataSource={detail}
      labelStyle={{color: '#999', width: '86px'}}
      columns={[
        {
          title: "所属菜单",
          key: "name",
          dataIndex: "name",
        },
        {
          title: "菜单类型",
          key: "type",
          dataIndex: "type",
          valueEnum: MenuTypeEnum
        },
        {
          title: "菜单编码",
          key: "code",
          dataIndex: "code",
        },
        {
          title: "菜单名称",
          key: "name",
          dataIndex: "name",
        },
        {
          title: "菜单组件",
          key: "component",
          dataIndex: "component",
          valueEnum: ComponentEnum
        },
        {
          title: "菜单图标",
          key: "icon",
          dataIndex: "icon",
        },
        {
          title: "重定向路径",
          key: "redirect",
          dataIndex: "redirect",
        },
        {
          title: "排序",
          key: "sort",
          dataIndex: "sort",
        },
        {
          title: "描述",
          key: "desc",
          dataIndex: "desc",
        },
        {
          title: "状态",
          key: "state",
          dataIndex: "state",
          valueType: "select",
          request: async () => {
            const { content }: any = await getAllApi('menuType');
            return content.map((item: { name: any; id: any }) => ({
              label: item.name,
              value: item.id,
            }));
          },
        },
        {
          title: "创建人",
          key: "create_user_name",
          dataIndex: "create_user_name",
        },
        {
          title: "创建时间",
          key: "create_time",
          dataIndex: "create_time",
          valueType: "date",
          fieldProps: {
            format: "YYYY-MM-DD HH:mm:ss",
          },
        },
        {
          title: "更新人",
          key: "create_user_name",
          dataIndex: "create_user_name",
        },
        {
          title: "更新时间",
          key: "update_time",
          dataIndex: "update_time",
          valueType: "date",
          fieldProps: {
            format: "YYYY-MM-DD HH:mm:ss",
          },
        }
      ]}
    >
    </ProDescriptions>
  );
};

export default MenuDetail;

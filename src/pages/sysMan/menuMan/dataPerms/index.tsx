import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm } from "antd";
import DataPermsForm from "./form";
import { deleteApi, getAllApi, getListApi } from "../../../../api/base";
import { ControlTypeEnum } from "../../../../constant/enum";
import { ReqTypeOpts } from "../../../../constant";

const DataPerms = ({menuList,currMenu}: any) => {
  const actionRef = useRef<ActionType>();

  const [visible, setVisible] = useState(false);
  const [dataPerms, setDataPerms] = useState({});

  const columns: ProColumns<any>[] = [
    {
      dataIndex: "index",
      valueType: "index",
      width: 48,
    },
    {
      title: "所属菜单",
      dataIndex: "menu_id",
      valueType: "select",
      fieldProps: {
        options: menuList
      }
    },
    {
      title: "功能类型",
      dataIndex: "type",
      valueType: 'select',
      valueEnum: ControlTypeEnum
    },
    {
      title: "功能编码",
      dataIndex: "code",
    },
    {
      title: "功能名称",
      dataIndex: "name",
    },
    {
      title: "功能api",
      dataIndex: "api",
    },
    {
      title: "请求方式",
      dataIndex: "method",
      valueType: "select",
      fieldProps: {
        options: ReqTypeOpts
      }
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // action?.startEditable?.(record.id);
            
            setVisible(true);
            setDataPerms(record);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定要删除吗？"
          onConfirm={() => deleteRow(record.id)}
          onVisibleChange={() => console.log("visible change")}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    refresh()
  }, [currMenu])

  const add = () => {
    setVisible(true);
    setDataPerms({});
  };
  const refresh = () => {
    actionRef.current?.reload();
  };

  const deleteRow = async (id: number) => {
    await deleteApi('dataPerms',id);
    message.success("删除成功");
    refresh();
  };

  return (
    <React.Fragment>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {

          const msg: any = await getAllApi('dataPerms',{menuId: currMenu.id});
          return {
            data: msg.content,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true
          };
        }}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={false}
        form={
          {
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            // syncToUrl: (values, type) => {
            //   if (type === 'get') {
            //     return {
            //       ...values,
            //       created_at: [values.startTime, values.endTime],
            //     };
            //   }
            //   return values;
            // },
          }
        }
        pagination={false}
        dateFormatter="string"
        headerTitle="权限列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={add}
          >
            新建
          </Button>,
        ]}
      />
      <DataPermsForm
        visible={visible}
        setVisible={setVisible}
        refresh={refresh}
        dataPerms={dataPerms}
        currMenu={currMenu}
      />
    </React.Fragment>
  );
};

export default DataPerms;

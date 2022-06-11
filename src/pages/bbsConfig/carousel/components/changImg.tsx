import React, { useEffect, useRef, useState } from "react";
import "../index.less";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Modal } from "antd";
import { getTreeArr } from "../../../../utils";
import { getAllApi, getListApi } from "../../../../api/base";
import ProTree from "../../../../components/proTree";

const ChangImg = ({ visible, setVisible,setChooseImg }: any) => {
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    getAllApi('folder',{ type: 2 }).then((res: any) => {
      const _treeData: any = getTreeArr({
        key: "id",
        pKey: "pid",
        data: res.content,
      });
      setTreeData(_treeData);
    });
  }, []);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: "所属目录",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "图片",
      dataIndex: "type",
      hideInSearch: true,
      render: (_, record) => (
        <img src={record.completePath} alt="" style={{width: '100%'}}/>
      ),
    },
    {
      title: "图片名称",
      dataIndex: "name",
    },
    {
      title: "图片类型",
      dataIndex: "suffix",
      hideInSearch: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => [
        <a
          key="select"
          onClick={() => {
            setChooseImg(record)
            setVisible(false)
          }}
        >
          选择
        </a>,
      ],
    },
  ];

  const refresh = () => {
    actionRef.current?.reload();
  };

  return (
    <Modal
      title="选择图片"
      visible={visible}
      width={"65%"}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <div className="container">
        <div className="left-tree">
          <ProTree treeData={treeData} />
        </div>
        <div className="right-table">
          <ProTable
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params = {}, sort, filter) => {
              const reuestParams = {
                ...params,
                curPage: params.current,
              };
              delete reuestParams.current;

              const msg: any = await getListApi('file',reuestParams);
              return {
                data: msg.content.result,
                // success 请返回 true，
                // 不然 table 会停止解析数据，即使有数据
                success: true,
                // 不传会使用 data 的长度，如果是分页一定要传
                total: msg.content.totals,
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
            search={{
              labelWidth: "auto",
            }}
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
            pagination={{
              pageSize: 5,
              onChange: (page) => console.log(page),
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChangImg;

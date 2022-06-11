import React, { useRef, useState } from 'react'
import { PlusOutlined } from "@ant-design/icons";

import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm } from 'antd';
import { deleteApi, getListApi } from '../../../api/base';

const QuestionMan = () => {
  const actionRef = useRef<ActionType>();

  const [visible, setVisible] = useState(false);
  const [article, setQuestion] = useState({});

  const columns: ProColumns<any>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "问题标题",
      dataIndex: "title",
      copyable: true,
      ellipsis: true,
      tip: "标题过长会自动收缩",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "解答进度",
      dataIndex: "type",
      hideInSearch: true,
    },
    {
      disable: true,
      title: "状态",
      dataIndex: "flag",
      filters: true,
      onFilter: true,
      valueType: "select",
      valueEnum: {
        1: { text: "草稿", status: "1" },
        2: {
          text: "审核中",
          status: "2",
        },
        3: {
          text: "已发布",
          status: "3",
        },
        4: {
          text: "审核失败",
          status: "4",
        },
        5: {
          text: "封禁",
          status: "5",
        },
      },
    },
    {
      title: "创建人",
      dataIndex: "create_user_name",
      hideInSearch: true,
    },
    {
      title: "创建时间",
      key: "showTime",
      dataIndex: "create_time",
      valueType: "dateTime",
      sorter: false,
      hideInSearch: true,
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
            setQuestion(record);
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
          <a>
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];

  const add = () => {
    setVisible(true);
    setQuestion({});
  };
  const refresh = () => {
    actionRef.current?.reload();
  };

  const deleteRow = async (id: number) => {
    await deleteApi('questionMan',id)
    message.success("删除成功");
  }

  return (
    <React.Fragment>
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

          const msg: any = await getListApi('question',reuestParams);
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
        dateFormatter="string"
        headerTitle="文章列表"
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
      {/* <QuestionForm
        visible={visible}
        setVisible={setVisible}
        refresh={refresh}
        article={article}
      /> */}
    </React.Fragment>
  );
}

export default QuestionMan
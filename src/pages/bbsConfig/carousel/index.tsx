import React, { useRef, useState } from 'react'
import { PlusOutlined } from "@ant-design/icons";

import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm } from 'antd';
import CarouselForm from './components/form';
import './index.less'
import { deleteApi, getListApi } from '../../../api/base';

const Carousel = () => {
  const actionRef = useRef<ActionType>();

  const [visible, setVisible] = useState(false);
  const [carousel, setCarousel] = useState({});

  const columns: ProColumns<any>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "标题",
      dataIndex: "title",
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
      title: "图片",
      dataIndex: "image",
      hideInSearch: true,
      render: (_, record) => (
        <img src={record.image} alt="" style={{width: '100%'}}/>
      ),
    },
    {
      title: "排序",
      dataIndex: "sort",
      hideInSearch: true,
    },
    {
      disable: true,
      title: "点击触发",
      dataIndex: "click",
      filters: true,
      onFilter: true,
      valueType: "select",
      valueEnum: {
        0: { text: "无效果", status: "1" },
        1: {
          text: "跳转路由（self）",
          status: "2",
        },
        2: {
          text: "跳转路由（blank）",
          status: "3",
        },
        3: {
          text: "跳转外部页面",
          status: "4",
        }
      },
    },
    {
      title: "跳转地址",
      dataIndex: "href",
      hideInSearch: true,
    },
    {
      disable: true,
      title: "状态",
      dataIndex: "status",
      filters: true,
      onFilter: true,
      valueType: "select",
      valueEnum: {
        1: { text: "启用", status: "1" },
        0: {
          text: "停用",
          status: "2",
        }
      },
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
      title: "更新日期",
      key: "showTime",
      dataIndex: "update_time",
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
            setCarousel(record);
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
    setCarousel({});
  };
  const refresh = () => {
    actionRef.current?.reload();
  };

  const deleteRow = async (id: number) => {
    await deleteApi('carousel',id)
    message.success("删除成功");
    refresh()
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

          const msg: any = await getListApi('carousel',reuestParams);
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
        headerTitle="轮播列表"
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
      <CarouselForm
        visible={visible}
        setVisible={setVisible}
        refresh={refresh}
        carousel={carousel}
      />
    </React.Fragment>
  );
}

export default Carousel
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { ProFormSelect } from "@ant-design/pro-components";
import { createApi, getAllApi, updateApi } from "../../../../api/base";
import { ControlTypeEnum } from "../../../../constant/enum";
import { ReqTypeOpts } from "../../../../constant";

const DataPermsForm = ({
  visible,
  setVisible,
  refresh,
  dataPerms = {},
  currMenu,
}: any) => {
  const [form] = Form.useForm();
console.log(dataPerms, 'dataPerms');

  const [chooseImg, setChooseImg] = useState({ completePath: "" });

  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (dataPerms.id) {
      form.setFieldsValue({
        ...dataPerms,
        type: dataPerms.type+''
      });
    } else {
      form.resetFields();
    }
    setChooseImg({ completePath: dataPerms.image });
  }, [dataPerms.id]);

  const onSubmit = async () => {
    const params = await form.validateFields();

    if (!dataPerms.id) {
      await createApi("dataPerms", {
        ...params,
        menu_id: currMenu.id,
      });
      message.success("添加成功");
      setVisible(false);
      refresh();
    } else {
      await updateApi("dataPerms", {
        ...params,
        menu_id: currMenu.id,
        id: dataPerms.id,
      });
      message.success("修改成功");
      setVisible(false);
      refresh();
    }
  };

  return (
    <Modal
      title={!dataPerms.id ? "添加" : "编辑"}
      onCancel={onClose}
      visible={visible}
      forceRender
      onOk={onSubmit}
    >
      <Form layout="horizontal" form={form}>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          label="所属菜单"
          required
        >
          <Tag color="blue">{currMenu?.name}</Tag>
        </Form.Item>
        <ProFormSelect
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          fieldProps={
            {
              // labelInValue: true,
            }
          }
          valueEnum={ControlTypeEnum}
          name="type"
          label="功能类型"
          rules={[
            {
              required: true,
              message: "请选择功能类型",
            },
          ]}
        />
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          name="code"
          label="功能编码"
          rules={[
            {
              required: true,
              message: "请选择功能编码",
            },
          ]}
        >
          <Input placeholder="请输入功能编码" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          name="name"
          label="功能名称"
          rules={[
            {
              required: true,
              message: "请选择功能名称",
            },
          ]}
        >
          <Input placeholder="请输入功能名称" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          name="api"
          label="功能api"
        >
          <Input placeholder="请输入功能api" />
        </Form.Item>
        <ProFormSelect
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          fieldProps={
            {
              // labelInValue: true,
              options: ReqTypeOpts
            }
          }
          name="method"
          label="请求方式"
          rules={[
            {
              required: true,
              message: "请选择请求方式",
            },
          ]}
        />
      </Form>
    </Modal>
  );
};

export default DataPermsForm;

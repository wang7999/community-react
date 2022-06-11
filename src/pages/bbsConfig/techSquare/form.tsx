import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
} from "antd";
import React, { useEffect, useState } from "react";
import { ProFormSelect } from "@ant-design/pro-components";
import { createApi, getAllApi, updateApi } from "../../../api/base";

const TechSquareForm = ({
  visible,
  setVisible,
  refresh,
  techSquare = {},
}: any) => {
  const [form] = Form.useForm();

  const [chooseImg, setChooseImg] = useState({ completePath: "" });

  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (techSquare.id) {
      form.setFieldsValue({
        ...techSquare,
      });
    } else {
      form.resetFields();
    }
    setChooseImg({ completePath: techSquare.image });
  }, [techSquare.id]);

  const onSubmit = async () => {
    const params = await form.validateFields();
    console.log(params);

    if (!techSquare.id) {
      await createApi('techSquare',{ ...params, tag_type_id: params.tag_type_id.value });
      message.success("添加成功");
      setVisible(false);
      refresh();
    } else {
      await updateApi('techSquare',{
        ...params,
        tag_type_id: params.tag_type_id.value,
        id: techSquare.id,
      });
      message.success("修改成功");
      setVisible(false);
      refresh();
    }
  };

  return (
    <Modal
      title={!techSquare.id ? "添加" : "编辑"}
      onCancel={onClose}
      visible={visible}
      forceRender
      onOk={onSubmit}
    >
      <Form layout="horizontal" form={form}>
        <ProFormSelect
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          fieldProps={{
            labelInValue: true,
          }}
          request={async () => {
            const { content }: any = await getAllApi('tagType');
            return content.map((item: { name: any; id: any }) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          name="tag_type_id"
          label="技术类型"
          rules={[
            {
              required: true,
              message: "请选择技术类型",
            },
          ]}
        />
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          name="name"
          label="别名"
        >
          <Input placeholder="请输入别名" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          name="sort"
          label="排序"
        >
          <InputNumber placeholder="请输入排序" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          label="状态"
          name="status"
        >
          <Radio.Group>
            <Radio value={1}> 启用 </Radio>
            <Radio value={0}> 禁用 </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TechSquareForm;

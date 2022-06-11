import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { PictureOutlined } from "@ant-design/icons";
import ChangImg from "./changImg";
import { createApi, updateApi } from "../../../../api/base";
const { TextArea } = Input;

const CarouselForm = ({ visible, setVisible, refresh, carousel = {} }: any) => {
  const [form] = Form.useForm();

  const [visibleModal, setVisibleModal] = useState(false);
  const [chooseImg, setChooseImg] = useState({ completePath: '' });

  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (carousel.id) {
      form.setFieldsValue({
        ...carousel,
      });
    } else {
      form.resetFields();
    }
    setChooseImg({ completePath: carousel.image })
  }, [carousel.id]);

  const onSubmit = async () => {
    const params = await form.validateFields();
    console.log(params);

    if (!carousel.id) {
      await createApi('carousel',{ ...params, image: chooseImg.completePath });
      message.success("添加成功");
      setVisible(false);
      refresh();
    } else {
      await updateApi('carousel',{
        ...params,
        image: chooseImg.completePath,
        id: carousel.id,
      });
      message.success("修改成功");
      setVisible(false);
      refresh();
    }
  };

  return (
    <Drawer
      title={!carousel.id?'添加': '编辑' }
      width={"60%"}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>返回</Button>
          <Button onClick={onSubmit} type="primary">
            提交
          </Button>
        </Space>
      }
      forceRender
    >
      <Form layout="horizontal" form={form}>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          name="title"
          label="标题"
          rules={[
            {
              required: true,
              message: "请输入标题",
            },
          ]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          // name="image"
          label="图片"
          required
        >
          <img
            src={chooseImg.completePath}
            alt=""
            style={{ width: "100px", marginRight: "20px" }}
          />
          <Button
            type="primary"
            icon={<PictureOutlined />}
            size="small"
            onClick={() => setVisibleModal(true)}
          >
            更换图片
          </Button>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          label="点击触发"
          name="click"
        >
          <Select
            placeholder="请选择"
            allowClear
            options={[
              { label: "无效果", value: 0 },
              { label: "跳转路由（self）", value: 1 },
              { label: "跳转路由（blank）", value: 2 },
              { label: "跳转外部页面", value: 3 },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          name="href"
          label="跳转地址"
        >
          <Input placeholder="请输入跳转地址" />
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
          name="desc"
          label="描述"
        >
          <TextArea rows={2} />
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
      <ChangImg
        visible={visibleModal}
        setVisible={setVisibleModal}
        setChooseImg={setChooseImg}
      />
    </Drawer>
  );
};

export default CarouselForm;

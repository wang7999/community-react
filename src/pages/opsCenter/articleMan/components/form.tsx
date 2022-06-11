import { Button, Drawer, Form, Input, message, Select, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "md-editor-rt/lib/style.css";
import MdEditor from "md-editor-rt";
import TagSelect from "./tagSelect";
import { createApi, getListApi, updateApi } from "../../../../api/base";

const ArticleForm = ({ visible, setVisible, refresh, article = {} }: any) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");

  const [tagList, setTagList] = useState([]);
  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (article.id) {
      form.setFieldsValue({
        ...article,
        tags: article.tagList.map((item: { id: any }) => item.id),
      });
    } else {
      form.resetFields();
    }
    setContent(article?.content || "");
  }, [article]);

  useEffect(() => {
    getListApi('tag',{
      curPage: 1,
      pageSize: 15,
    }).then((res: any) => {
      setTagList(res.content.result);
    });
  }, []);

  const onSubmit = async () => {
    const params = await form.validateFields();
    if (!article.id) {
      await createApi('article',{ ...params, content });
      message.success("添加成功");
      setVisible(false);
      refresh();
    } else {
      await updateApi('article',{ ...params, content, id: article.id });
      message.success("修改成功");
      setVisible(false);
      refresh();
    }
  };

  return (
    <Drawer
      title={!article.id?'新增':'编辑'}
      width={"100%"}
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
              message: "请输入文章标题",
            },
          ]}
        >
          <Input placeholder="请输入文章标题" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          name="desc"
          label="描述"
        >
          <Input placeholder="请输入文章描述" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          label="类型"
          name="type"
          rules={[
            {
              required: true,
              message: "请选择类型",
            },
          ]}
        >
          <Select
            placeholder="请选择"
            allowClear
            options={[
              { label: "原创", value: 1 },
              { label: "转载", value: 2 },
              { label: "翻译", value: 3 },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          label="标签"
          name="tags"
          rules={[
            {
              required: true,
              message: "请选择标签",
            },
          ]}
        >
          <TagSelect tagList={tagList} setTagList={setTagList} />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          label="内容"
          // name="content"
        >
          <MdEditor modelValue={content} onChange={setContent} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ArticleForm;

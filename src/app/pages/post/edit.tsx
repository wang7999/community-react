import { fetchCreatePost, fetchGetCaptcha } from "@/api";
import { types } from "@/app/constant";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  type: yup.string().required(),
  title: yup.string().required(),
  fav: yup.string().required("请输入悬赏积分"),
  captcha: yup.string().required("请输入验证码"),
});

export const PostEdit = () => {
  const [uid, setUid] = useState("");
  const [captchaHtml, setCaptchaHtml] = useState("");
  const navigate = useNavigate()

  const typesOpts = Object.keys(types).map((key) => ({
    label: types[key],
    value: key,
  }));
  const [editor, setEditor] = useState<any>(null); // 存储 editor 实例

  const getCaptcha = async () => {
    const _uid = uuidv4();
    const { data } = await fetchGetCaptcha({ uid: _uid });
    setUid(_uid);
    setCaptchaHtml(data);
  };

  useEffect(() => {
    getCaptcha();
  }, []);
  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容...",
  };
  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const onSave = async (params = {}) => {
    const {code, data, msg} = await fetchCreatePost(params)
    if (code === 200) {
      navigate('/index')
      toast.success(msg ||'保存成功')
    } else {
      // toast.error(msg||'保存失败')
    }
  }
  return (
    <Card border="0">
      <Card.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            onSave({...values, uid})
          }}
          initialValues={{
            type: "",
            title: "",
            fav: "",
            captcha: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="2">
                  <Form.Select
                    name="type"
                    onChange={handleChange}
                    isInvalid={!!errors.type}
                  >
                    {typesOpts.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    请选择分类
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="10">
                  <Form.Control
                    type="text"
                    name="title"
                    // value={values.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                    placeholder="请输入标题"
                  />
                  <Form.Control.Feedback type="invalid">
                    请输入标题
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <div
                style={{
                  border: "1px solid #ccc",
                  zIndex: 100,
                  marginTop: "15px",
                }}
              >
                <Toolbar
                  editor={editor}
                  defaultConfig={toolbarConfig}
                  mode="default"
                  style={{ borderBottom: "1px solid #ccc" }}
                />
                <Editor
                  defaultConfig={editorConfig}
                  // value={html}
                  onCreated={setEditor}
                  // onChange={(editor) => setHtml(editor.getHtml())}
                  mode="default"
                  style={{ height: "500px" }}
                />
              </div>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  悬赏积分
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="悬赏积分"
                    name="fav"
                    value={values.fav}
                    onChange={handleChange}
                    isInvalid={!!errors.fav}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fav}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  验证码
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder="悬赏积分"
                    name="captcha"
                    value={values.captcha}
                    onChange={handleChange}
                    isInvalid={!!errors.captcha}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.captcha}
                  </Form.Control.Feedback>
                </Col>
                <Col sm={2}>
                  <div
                    dangerouslySetInnerHTML={{ __html: captchaHtml }}
                    style={{ marginTop: -15 }}
                    onClick={() => getCaptcha()}
                  ></div>
                </Col>
              </Form.Group>
              <Button type="submit" variant="primary">
                发布新帖
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

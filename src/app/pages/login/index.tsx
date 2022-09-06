import { fetchGetCaptcha, fetchLogin } from "@/api";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@/app/stores/hooks";
import { setToken, setUserInfo } from "@/app/stores/user";

const schema = yup.object().shape({
  userName: yup
    .string()
    .email("请输入正确的邮箱地址")
    .required("请输入正确的邮箱地址"),
  passWord: yup.string().required("请输入密码"),
  captcha: yup.string().required("请输入验证码"),
});

interface ILogin {
  userName: string,
  passWord: string,
  captcha: string,
}

export const Login = () => {
  const [uid, setUid] = useState("");
const [captchaHtml, setCaptchaHtml] = useState('')

const dispatch = useAppDispatch()
const navigate = useNavigate();
const location = useLocation();

  useEffect(() => {
    getCaptcha();
  }, []);

  const getCaptcha = async () => {
    const _uid = uuidv4();
    const { data } = await fetchGetCaptcha({ uid: _uid });
    setUid(_uid);
    setCaptchaHtml(data);
  };
  const handleSubmit = async (values: ILogin) => {
    const {code, data} = await fetchLogin({...values, uid})
    
    if (code === 200) {
      const {token, userInfo} = data
      console.log(token, data, 11);
      
      dispatch(setToken(token))
      dispatch(setUserInfo(userInfo))
      navigate('/index')
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div
        className="bg-white rounded shadow-sm p-4"
        style={{ maxWidth: 500, width: 500 }}
      >
        <div className="fs-4 text-center">登录</div>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
          initialValues={{
            userName: "",
            passWord: "",
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
              <Form.Group className="mb-3">
                <Form.Label>用户名</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="请输入用户名（邮箱）"
                  name="userName"
                  onChange={handleChange}
                  isInvalid={!!errors.userName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.userName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>密码</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="请输入密码"
                  name="passWord"
                  onChange={handleChange}
                  isInvalid={!!errors.passWord}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passWord}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>验证码</Form.Label>
                <div className="d-flex">
                  <div className="flex-fill">
                    <Form.Control
                      type="text"
                      placeholder="请输入验证码"
                      name="captcha"
                      onChange={handleChange}
                      isInvalid={!!errors.captcha}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.captcha}
                    </Form.Control.Feedback>
                  </div>
                  <div>
                    <div
                      dangerouslySetInnerHTML={{ __html: captchaHtml }}
                      style={{ marginTop: -15 }}
                      onClick={() => getCaptcha()}
                    ></div>
                  </div>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex justify-content-between"
                controlId="formBasicCheckbox"
              >
                <Form.Check type="checkbox" label="记住密码" />
                <Link to={"/"}>忘记密码?</Link>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                立即登录
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

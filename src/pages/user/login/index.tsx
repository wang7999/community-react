import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
// import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {  useNavigate, useParams,useSearchParams } from 'react-router-dom';
import './index.less'
import { useStore } from '../../../store';


const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const navigate = useNavigate()
  const { userStore } = useStore()

  const [searchParams] = useSearchParams()

  const fetchUserInfo = async () => {
    // const userInfo = await initialState?.fetchUserInfo?.();
    // if (userInfo) {
    //   await setInitialState((s) => ({
    //     ...s,
    //     currentUser: userInfo,
    //   }));
    // }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      await userStore.login({ ...values, type: '2' })
        message.success('登录成功！');
          /** 此方法会跳转到 redirect 参数所在的位置 */
          if (!navigate) return;
          const redirect = searchParams.get('redirect');
          navigate(redirect || '/', { replace: true })
          return;
      // const msg = await login({ ...values, type });
      // if (msg.status === 'ok') {
      //   message.success('登录成功！');
      //   await fetchUserInfo();
      //   /** 此方法会跳转到 redirect 参数所在的位置 */
      //   if (!navigate) return;
      //   const { query } = navigate.location;
      //   const { redirect } = query as { redirect: string };
      //   navigate(redirect || '/', { replace: true })
      //   return;
      // }
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className='container'>
      {/* <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div> */}
      <div className='content'>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={'subTitle'}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            '其他登录方式',
            <AlipayCircleOutlined key="AlipayCircleOutlined" className='icon' />,
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className='icon' />,
            <WeiboCircleOutlined key="WeiboCircleOutlined" className='icon' />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={'账户密码登录'}
            />
            {/* <Tabs.TabPane
              key="mobile"
              tab={'手机号登录'}
            /> */}
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={'账户或密码错误(admin/ant.design)'}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className='prefixIcon' />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '"请输入用户名!"',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className='prefixIcon' />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className='prefixIcon' />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '请输入手机号！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className='prefixIcon' />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入手机号！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  // const result = await getFakeCaptcha({
                  //   phone,
                  // });
                  // if (result === false) {
                  //   return;
                  // }
                  // message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
            自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;

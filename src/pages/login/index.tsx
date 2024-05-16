import type { LoginParams, RegisterParams } from '@/interface/user/login';
import type { RadioChangeEvent } from 'antd';

import './index.less';

import { Button, Card, Col, Form, Image, Input, Radio, Row } from 'antd';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RoleEnum } from '@/interface/user/login';
import { setUserItem } from '@/stores/user.store';
import { formatSearch } from '@/utils/formatSearch';

import { loginAsync, registerAsync } from '../../stores/user.action';
import { LoginPage, WraperLogin } from './loginStyle';

const initialValues: LoginParams = {
  email: '',
  password: '',
};
const initialValuesRegister: RegisterParams = {
  name: '',
  email: '',
  role: RoleEnum.creator,
  password: '',
};

const LoginForm: FC = () => {
  const location = useLocation();
  const [activeRegister, setActiveRegister] = useState(true);

  const [, setValueRol] = useState('creador');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinished = async (form: LoginParams) => {
    const res = await loginAsync(form);

    if (res) {
      localStorage.setItem('token', res.tokens?.access.token);
      localStorage.setItem('refreshToken', res.tokens?.refresh.token);
      dispatch(
        setUserItem({
          logged: true,
          username: res.user,
        }),
      );
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/' };

      navigate(from);
    }
  };

  const onRegister = async (form: RegisterParams) => {
    const res = await dispatch(registerAsync(form));

    if (!!res) {
      onReset();

      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/' };

      navigate(from);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    setValueRol(value);
  };

  return (
    <LoginPage>
      <Row>
        <Col className={activeRegister ? 'bg-login' : 'bg-video'} xs={0} sm={0} md={0} lg={8} xl={8}>
          {!activeRegister && (
            <video autoPlay muted loop id="myVideo">
              <source src="src/assets/video/bg-video.mp4" type="video/mp4" />
            </video>
          )}
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <WraperLogin>
            {activeRegister ? (
              <Card style={{ width: 450, maxHeight: '90%' }}>
                <Image preview={false} width={150} src="src/assets/logo/logobook.png"></Image>
                <Form<LoginParams> onFinish={onFinished} className="login-page-form" initialValues={initialValues}>
                  <h2 className="my-0">Hellow Again!</h2>
                  <p className="mt-0">Welcome back you've been missed!</p>
                  <>
                    <label>Email</label>
                    <Form.Item
                      className="form-inputs"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your Email!',
                        },
                      ]}
                    >
                      <Input type="text" size="large" />
                    </Form.Item>
                  </>
                  <>
                    <label>Password</label>
                    <Form.Item
                      name="password"
                      className="form-inputs"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your Password!',
                        },
                      ]}
                    >
                      <Input.Password type="password" size="large" />
                    </Form.Item>
                  </>
                  <Form.Item>
                    <>
                      <Button size="large" htmlType="submit" type="primary" className="login-page-form_button">
                        Login
                      </Button>
                      <p>
                        Don't have an account?{' '}
                        <a className="custom-ancla" onClick={() => setActiveRegister(!activeRegister)}>
                          Sign up
                        </a>
                      </p>
                    </>
                  </Form.Item>
                </Form>
              </Card>
            ) : (
              <>
                <Card style={{ width: 450, maxHeight: '90%' }}>
                  <Form<RegisterParams>
                    onFinish={onRegister}
                    form={form}
                    className="login-page-form"
                    initialValues={initialValuesRegister}
                  >
                    <Image preview={false} width={100} src="src/assets/logo/logobook.png"></Image>
                    <h2 className="mt-0">Welcome to Bigbook!</h2>
                    <Form.Item
                      className="form-inputs"
                      name="role"
                      rules={[
                        {
                          required: true,
                          message: 'Please select your Role!',
                        },
                      ]}
                    >
                      <Radio.Group buttonStyle="solid" onChange={onChange1}>
                        <Radio.Button value="creador">Creator</Radio.Button>
                        <Radio.Button value="lector">Reader</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <>
                      <label>UserName</label>
                      <Form.Item
                        className="form-inputs"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Username!',
                          },
                        ]}
                      >
                        <Input type="text" size="large" />
                      </Form.Item>
                    </>
                    <>
                      <label>Email</label>

                      <Form.Item
                        className="form-inputs"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Email!',
                          },
                        ]}
                      >
                        <Input type="text" size="large" />
                      </Form.Item>
                    </>
                    <>
                      <label>Password</label>
                      <Form.Item
                        name="password"
                        className="form-inputs"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Password!',
                          },
                        ]}
                      >
                        <Input.Password type="password" size="large" />
                      </Form.Item>
                    </>

                    <Form.Item>
                      <>
                        <Button size="large" htmlType="submit" type="primary" className="login-page-form_button">
                          Register
                        </Button>
                        <p>
                          Already have an account?
                          <a className="custom-ancla" onClick={() => setActiveRegister(!activeRegister)}>
                            Sign in
                          </a>
                        </p>
                      </>
                    </Form.Item>
                  </Form>
                </Card>
              </>
            )}
          </WraperLogin>
        </Col>
      </Row>
    </LoginPage>
  );
};

export default LoginForm;

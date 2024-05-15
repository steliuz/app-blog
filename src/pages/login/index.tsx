import type { LoginParams, RegisterParams } from '@/interface/user/login';
import type { RadioChangeEvent } from 'antd';

import './index.less';

import { Button, Card, Col, Form, Image, Input, Radio, Row } from 'antd';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RoleEnum } from '@/interface/user/login';
import { LocaleFormatter, useLocale } from '@/locales';
import { formatSearch } from '@/utils/formatSearch';

import { loginAsync } from '../../stores/user.action';
import { LoginPage, WraperLogin } from './loginStyle';

const initialValues: LoginParams = {
  email: 'guest',
  password: 'guest',
};
const initialValuesRegister: RegisterParams = {
  username: '',
  email: '',
  role: RoleEnum.creator,
  password: '',
};

const LoginForm: FC = () => {
  const { formatMessage } = useLocale();
  const location = useLocation();
  const [activeRegister, setActiveRegister] = useState(true);
  const [, setValueRol] = useState('creator');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinished = async (form: LoginParams) => {
    const res = dispatch(await loginAsync(form));

    if (!!res) {
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/' };

      navigate(from);
    }
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
                  <Form.Item
                    className="form-inputs"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: formatMessage({
                          id: 'gloabal.tips.enterUsernameMessage',
                        }),
                      },
                    ]}
                  >
                    <>
                      <label>{formatMessage({ id: 'gloabal.tips.email' })}</label>
                      <Input type="text" size="large" />
                    </>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    className="form-inputs"
                    rules={[
                      {
                        required: true,
                        message: formatMessage({
                          id: 'gloabal.tips.enterPasswordMessage',
                        }),
                      },
                    ]}
                  >
                    <>
                      <label>{formatMessage({ id: 'gloabal.tips.password' })}</label>
                      <Input type="password" size="large" />
                    </>
                  </Form.Item>
                  <Form.Item>
                    <>
                      <Button size="large" htmlType="submit" type="primary" className="login-page-form_button">
                        <LocaleFormatter id="gloabal.tips.login" />
                      </Button>
                      <p>
                        {formatMessage({
                          id: 'gloabal.tips.noAccount',
                        })}{' '}
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
                    className="login-page-form"
                    initialValues={{ ...initialValuesRegister, role: 'creator' }}
                  >
                    <Image preview={false} width={100} src="src/assets/logo/logobook.png"></Image>
                    <h2 className="mt-0">Welcome to Bigbook!</h2>
                    <Form.Item
                      className="form-inputs"
                      name="role"
                      rules={[
                        {
                          required: true,
                          message: formatMessage({
                            id: 'gloabal.tips.enterUsernameMessage',
                          }),
                        },
                      ]}
                    >
                      <Radio.Group buttonStyle="solid" onChange={onChange1}>
                        <Radio.Button value="creator">{formatMessage({ id: 'gloabal.tips.creator' })}</Radio.Button>
                        <Radio.Button value="reader">{formatMessage({ id: 'gloabal.tips.reader' })}</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      className="form-inputs"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: formatMessage({
                            id: 'gloabal.tips.enterUsernameMessage',
                          }),
                        },
                      ]}
                    >
                      <>
                        <label>{formatMessage({ id: 'gloabal.tips.username' })}</label>
                        <Input type="text" size="large" />
                      </>
                    </Form.Item>
                    <Form.Item
                      className="form-inputs"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: formatMessage({
                            id: 'gloabal.tips.enterUsernameMessage',
                          }),
                        },
                      ]}
                    >
                      <>
                        <label>{formatMessage({ id: 'gloabal.tips.email' })}</label>
                        <Input type="text" size="large" />
                      </>
                    </Form.Item>
                    <Form.Item
                      name="password"
                      className="form-inputs"
                      rules={[
                        {
                          required: true,
                          message: formatMessage({
                            id: 'gloabal.tips.enterPasswordMessage',
                          }),
                        },
                      ]}
                    >
                      <>
                        <label>Password</label>
                        <Input type="password" size="large" />
                      </>
                    </Form.Item>
                    <Form.Item>
                      <>
                        <Button size="large" htmlType="submit" type="primary" className="login-page-form_button">
                          <LocaleFormatter id="gloabal.tips.register" />
                        </Button>
                        <p>
                          {formatMessage({
                            id: 'gloabal.tips.already',
                          })}{' '}
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

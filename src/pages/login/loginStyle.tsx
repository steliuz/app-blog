/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';

export const LoginPage = styled.div`
  height: 100vh;
`;

export const WraperLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ffffff;
  padding: 12px;

  .ant-card {
    padding: 10px;
    text-align: center;
  }

  .login-page-form_button {
    width: 100%;
    background-color: #1c84b5;
    color: #fff;

    &:hover {
      background-color: #18698e;
    }
  }
`;

import type { RegisterParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';

import { apiLogin, apiLogout, apiRegister } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = (payload: any) => {
  return apiLogin(payload);
};

export const registerAsync = createAsyncAction<RegisterParams, any>(payload => {
  return async dispatch => {
    const data = await apiRegister(payload);

    if (data) {
      localStorage.setItem('token', data.tokens?.access.token);
      localStorage.setItem('refreshToken', data.tokens?.refresh.token);
      dispatch(
        setUserItem({
          logged: true,
          username: data.user.name,
        }),
      );

      return data;
    }

    return false;
  };
});

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    const data: any = await apiLogout({ refreshToken: localStorage.getItem('refreshToken')! });

    if (data === '') {
      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false,
        }),
      );

      return true;
    }

    return false;
  };
};

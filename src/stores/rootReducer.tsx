import { combineReducers } from '@reduxjs/toolkit';

import globalReducer from './global.store';
import userReducer from './user.store';

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
});

export default rootReducer;

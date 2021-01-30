import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import clientReducer from './clientSlice';
import employeeReducer from './empSlice';
import propertyReducer from './PropertySlice';
import settingsReducer from './propertySettings';

export default configureStore({
  reducer: {

    auth:authReducer,
   client:clientReducer,
   employee:employeeReducer,
   property:propertyReducer,
   settings:settingsReducer
  },
});

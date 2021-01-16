import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import clientReducer from './clientSlice';
import employeeReducer from './empSlice';


export default configureStore({
  reducer: {

    auth:authReducer,
   client:clientReducer,
   employee:employeeReducer

  },
});

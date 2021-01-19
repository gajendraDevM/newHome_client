import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import keyUri from '../key'




export const initialState = {

    loading:false,
    hasErrors:false,

   employee:[],
   current_employee:null


}

export const EmployeeSlice = createSlice({


    name:"Employee",
    initialState,
    reducers:{

      getEmployee:state =>{

        state.loading = true;
      },

      getEmployeeSuccess: (state, { payload }) =>{

        state.loading = false;
        state.employee  =  payload;

        

      },

      getEmployeeError: state =>{

        state.hasErrors = true;
     

      },

      getCurrentEmployee: (state, { payload }) =>{

        state.loading = false;
     state.current_employee = payload;

      }


    }


})


export const {getEmployee, getCurrentEmployee,  getEmployeeSuccess, getEmployeeError }  = EmployeeSlice.actions

export const employeeSelector = state => state.employee
export default EmployeeSlice.reducer


const config = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
  };


  export const fetchAllEmployees = () => async dispatch =>{
    const key = 'login';
    dispatch(getEmployee())


    try {
        
        const {data} = await axios.get(keyUri + '/api/employee')
    console.log(data);
        dispatch(getEmployeeSuccess(data))

    } catch (error) {

dispatch(getEmployeeError())
setTimeout(() => {

    message.error({ content: error.response.data.msg, key, duration: 2 });
  }, 100) 

        
    }

}

export const createEmployee = (values) => async dispatch =>{


    const key = 'login';
    dispatch(getEmployee())
    message.loading({ content: 'loading...', key })

    try {
        
        const {data} = await axios.post(keyUri + '/api/employee', values, config)
    
        data &&  message.success({ content: data.msg, key, duration: 2 });

        dispatch(fetchAllEmployees())

    } catch (error) {

dispatch(getEmployeeError())
setTimeout(() => {

    message.error({ content: error.response.data.msg, key, duration: 2 });
  }, 100) 

        
    }

}




export const editEmployee = (id, values) => async dispatch =>{
  const key = 'update';
  dispatch(getEmployee())
  message.loading({ content: 'loading...', key })
console.log(id);
  try {
      
      const {data} = await axios.put(keyUri + `/api/employee/${id}`, values, config)
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllEmployees())

  } catch (error) {

dispatch(getEmployeeError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}



export const fetchOneEmployee = (id) => async dispatch =>{
  const key = 'update';
  dispatch(getEmployee())
  

  try {
      
      const {data} = await axios.get(keyUri + `/api/employee/${id}`)
     
      dispatch(getCurrentEmployee(data))

  } catch (error) {

dispatch(getEmployeeError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}






export const deleteEmployee = (id) => async dispatch =>{
  const key = 'login';
  dispatch(getEmployee())
  message.loading({ content: 'loading...', key })

  try {
      
      const {data} = await axios.delete(keyUri + `/api/employee/${id}`)
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllEmployees())

  } catch (error) {

dispatch(getEmployeeError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}



export const deleteManyEmployee = (values) => async dispatch =>{

  console.log(values);
  const key = 'delete';
  dispatch(getEmployee())
  message.loading({ content: 'loading...', key })

  try {
      
      const {data} = await axios.post(keyUri + `/api/employee-many`, values, config )
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllEmployees())

  } catch (error) {

dispatch(getEmployeeError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}


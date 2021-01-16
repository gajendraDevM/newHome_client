import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import keyUri from '../key'


const token =  localStorage.getItem('token') ?
  localStorage.getItem('token') : null


export const initialState = {

    loading:false,
    hasErrors:false,
   isAuthenticate:  token? true : false,
   user:null,
   current:[]


}

export const authenticateSlice = createSlice({


    name:"auth",
    initialState,
    reducers:{

      getlogin:state =>{

        state.loading = true;
      },

      getAuthenticate: (state, {payload}) =>{

        state.loading = false;
        state.isAuthenticate = true;
        state.user = payload
   
        localStorage.setItem('user', JSON.stringify(state.user) )
        

      },
      getFilter: (state, {payload}) =>{

        state.loading = false;
        state.current = payload
  
      },
    
      isAuthenticateError: state =>{

        state.hasErrors = true;
     

      }



    }


})


export const {getlogin, getFilter, getAuthenticate, isAuthenticateError }  = authenticateSlice.actions

export const authenticateSelector = state => state.auth
export default authenticateSlice.reducer


const config = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
  };


export const logOut = () => async dispatch =>{
    // const key = 'logOut';


    try {
        
       
        localStorage.removeItem('user');
        window.location.reload();
 

        

    } catch (error) {

        dispatch(isAuthenticateError())

    }

}






export const fetchlogin = (logindata) => async dispatch =>{
    const key = 'login';
    dispatch(getlogin())
    message.loading({ content: 'loading...', key })

    try {
        
        const {data} = await axios.post(keyUri + '/api/adminAuth', logindata, config)
       

    
        localStorage.setItem('token', data.token)
        dispatch(getAuthenticate(data))

    

 

        data &&  message.success({ content: data.msg, key, duration: 2 });

     


    } catch (error) {


setTimeout(() => {

    message.error({ content: error.response.data.msg, key, duration: 2 });
  }, 500) 

        dispatch(isAuthenticateError())
    }

}



export const fethFilter = (value, filter) => async dispatch =>{
  dispatch(getlogin())

  try {
      
      const {data} = await axios.get(keyUri + `/api/${value}?search=${filter}`)
     console.log(data);
      dispatch(getFilter(data))


  } catch (error) {

      dispatch(isAuthenticateError())
  }

}
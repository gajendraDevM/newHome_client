import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import keyUri from '../key'




export const initialState = {

    loading:false,
    hasErrors:false,

   client:[],
   current_client:null


}

export const clientSlice = createSlice({


    name:"client",
    initialState,
    reducers:{

      getClient:state =>{

        state.loading = true;
      },

      getClientSuccess: (state, { payload }) =>{

        state.loading = false;
        state.client  =  payload;

        

      },

      getClientError: state =>{

        state.hasErrors = true;
     

      },

      getCurrentClient: (state, { payload }) =>{

        state.loading = false;
     state.current_client = payload;

      }


    }


})


export const {getClient, getCurrentClient,  getClientSuccess, getClientError }  = clientSlice.actions

export const clientSelector = state => state.client
export default clientSlice.reducer


const config = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
  };


  export const fetchAllClients = (values) => async dispatch =>{
    const key = 'login';
    dispatch(getClient())


    try {
        
        const {data} = await axios.get(keyUri + '/api/client')
    
        dispatch(getClientSuccess(data))

    } catch (error) {

dispatch(getClientError())
setTimeout(() => {

    // message.error({ content: error.response.data.msg, key, duration: 2 });
  }, 100) 

        
    }

}

export const createClient = (values) => async dispatch =>{
    const key = 'login';
    dispatch(getClient())
    message.loading({ content: 'loading...', key })

    try {
        
        const {data} = await axios.post(keyUri + '/api/client', values, config)
    
        data &&  message.success({ content: data.msg, key, duration: 2 });

        dispatch(fetchAllClients())

    } catch (error) {

dispatch(getClientError())
setTimeout(() => {

    message.error({ content: error.response.data.msg, key, duration: 2 });
  }, 100) 

        
    }

}




export const editClient = (id, values) => async dispatch =>{
  const key = 'update';
  dispatch(getClient())
  message.loading({ content: 'loading...', key })
console.log(id);
  try {
      
      const {data} = await axios.put(keyUri + `/api/client/${id}`, values, config)
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllClients())

  } catch (error) {

dispatch(getClientError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}



export const fetchOneClient = (id) => async dispatch =>{
  const key = 'update';
  dispatch(getClient())
  

  try {
      
      const {data} = await axios.get(keyUri + `/api/client/${id}`)
     
      dispatch(getCurrentClient(data))

  } catch (error) {

dispatch(getClientError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}






export const deleteClient = (id) => async dispatch =>{
  const key = 'login';
  dispatch(getClient())
  message.loading({ content: 'loading...', key })

  try {
      
      const {data} = await axios.delete(keyUri + `/api/client/${id}`)
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllClients())

  } catch (error) {

dispatch(getClientError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}





import {createSlice, current} from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import keyUri from '../key'




export const initialState = {

    loading:false,
    hasErrors:false,

   property:[],
   current_property:null


}

export const propertySlice = createSlice({


    name:"property",
    initialState,
    reducers:{

      getProperty:state =>{

        state.loading = true;
      },

      getPropertySuccess: (state, { payload }) =>{

        state.loading = false;
        state.property  =  payload;

        

      },

      getPropertyError: state =>{

        state.hasErrors = true;
     

      },

      getCurrentProperty: (state, { payload }) =>{

        state.loading = false;
     state.current_property = payload;

      },

      getFilter: (state, { payload }) =>{

         state.loading = false;
         state.property = payload
      },

      getPropertyFilterSuccess:(state, {payload}) => {

        // console.log(current(state.property));
        state.loading = false;

        state.property = payload

     

      }


    }


})


export const {getProperty, getFilter, getPropertyFilterSuccess,  getCurrentProperty,
    getPropertySuccess, getPropertyError }  = propertySlice.actions

export const propertySelector = state => state.property
export default propertySlice.reducer


const config = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
  };


  export const fetchAllpropertys = (filterword=null) => async dispatch =>{
    const key = 'login';
    dispatch(getProperty())


    try {
        
        const {data} = await axios.get(keyUri + `/api/property?filterword=${filterword}`)
    
        console.log(data);

        dispatch(getPropertySuccess(data))

    } catch (error) {

dispatch(getPropertyError())
// setTimeout(() => {

//     message.error({ content: error.response.data.msg, key, duration: 2 });
//   }, 100) 

        
    }

}

export const createproperty = (values) => async dispatch =>{
    const key = 'login';
    dispatch(getProperty())
    message.loading({ content: 'loading...', key })

    try {
        
        const {data} = await axios.post(keyUri + '/api/property', values, config)
    
        data &&  message.success({ content: data.msg, key, duration: 2 });

        dispatch(fetchAllpropertys())

    } catch (error) {

dispatch(getPropertyError())
setTimeout(() => {

    message.error({ content: error.response.data.msg, key, duration: 2 });
  }, 100) 

        
    }

}




export const editproperty = (id, values) => async dispatch =>{
  const key = 'update';
  dispatch(getProperty())
  message.loading({ content: 'loading...', key })
console.log(id);
  try {
      
      const {data} = await axios.put(keyUri + `/api/property/${id}`, values, config)
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllpropertys())

  } catch (error) {

dispatch(getPropertyError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}



export const fetchOneproperty = (id) => async dispatch =>{
  const key = 'update';
  dispatch(getProperty())
  

  try {
      
      const {data} = await axios.get(keyUri + `/api/property/${id}`)
     
      dispatch(getCurrentProperty(data))

  } catch (error) {

dispatch(getPropertyError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}






export const deleteproperty = (id) => async dispatch =>{
  const key = 'login';
  dispatch(getProperty())
  message.loading({ content: 'loading...', key })

  try {
      
      const {data} = await axios.delete(keyUri + `/api/property/${id}`)
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllpropertys())

  } catch (error) {

dispatch(getPropertyError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}


export const deleteManyproperty = (values) => async dispatch =>{

  console.log(values);
  const key = 'delete';
  dispatch(getProperty())
  message.loading({ content: 'loading...', key })

  try {
      
      const {data} = await axios.post(keyUri + `/api/property-many`, values, config )
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllpropertys())

  } catch (error) {

dispatch(getPropertyError())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}




export const fetchFilter = (filterword=null,  bhk= null, price=null, filter = null) => async dispatch =>{
  const key = 'update';
  dispatch(getProperty())
  
// if(filter) {


//   return   dispatch(getPropertySuccess(filter))


// }

  try {
    if(price){

      const {data} = await axios.get(keyUri + `/api/property/filter?filterword=${filterword}&bhk=${bhk}&price1=${price[0]}&price2=${price[1]}`)
      dispatch(getPropertySuccess(data))

      
    }else if(bhk) {

      const {data} = await axios.get(keyUri + `/api/property/filter?filterword=${filterword}&bhk=${bhk}`)
      dispatch(getPropertySuccess(data))


    } else {
      
      const {data} = await axios.get(keyUri + `/api/property/filter?filterword=${filterword}`)
      dispatch(getPropertySuccess(data))

    }

  } catch (error) {

// dispatch(getPropertyError())
// setTimeout(() => {

//   message.error({ content: error.response.data.msg, key, duration: 2 });
// }, 100) 

      
  }
 
}


export const fethFilterWithBetween = (propertydata) => async dispatch =>{
  dispatch(getProperty())

  try {
      
      // const {data} = await axios.get(keyUri + `/api/property/filter-between?filter=${filterword}&min=${min}&max=${max}`)
 
    
     dispatch(getPropertyFilterSuccess(propertydata))


  } catch (error) {

    dispatch(getPropertyError())
  }

}
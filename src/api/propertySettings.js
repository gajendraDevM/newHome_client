import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import keyUri from '../key'




export const initialState = {

    loading:false,
    hasErrors:false,
    settings:[]


}

export const PropertySettingSlice = createSlice({


    name:"Settings",
    initialState,
    reducers:{

      getPropertySetting:state =>{

        state.loading = true;
      },

      getPropertySettingSuccess: (state, { payload }) =>{

        state.loading = false;
        state.settings  =  payload;

        

      },

      getPropertySettingError: state =>{

        state.hasErrors = true;
     

      },

      getCurrentPropertySetting: (state, { payload }) =>{

        state.loading = false;
     state.current_PropertySetting = payload;

      }


    }


})


export const {getPropertySetting, getCurrentPropertySetting,  getPropertySettingSuccess, getPropertySettingError }  = PropertySettingSlice.actions

export const PropertySettingSelector = state => state.settings
export default PropertySettingSlice.reducer


const config = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
  };


  export const creatPropertySettings = (values) => async dispatch =>{
    const key = 'login';
    dispatch(getPropertySetting())

    try {
        
        const {data} = await axios.post(keyUri + '/api/setting-property', values, config)
  
        dispatch(getPropertySettingSuccess(data))

    } catch (error) {

dispatch(getPropertySettingError())


        
    }

}

  export const fetchAllPropertySettings = () => async dispatch =>{
    dispatch(getPropertySetting())


    try {
        
        const {data} = await axios.get(keyUri + '/api/setting-property')
  
        console.log(data);
        dispatch(getPropertySettingSuccess(data))

    } catch (error) {

dispatch(getPropertySettingError())


        
    }

}


export const fetchSettings = (values) => async dispatch =>{
  dispatch(getPropertySetting())

let datavalue = {

  property_type:values.value,
  property:values.text,


}

  try {
      
      const {data} = await axios.post(keyUri + '/api/setting', datavalue, config)

       message.success('success!')
      dispatch(fetchAllSettings())
      setTimeout(()=>{
         window.location.reload()
      }, 1000)
     

  } catch (error) {

dispatch(getPropertySettingError())


      
  }

}


export const fetchAllSettings = () => async dispatch =>{
  dispatch(getPropertySetting())


  try {
      
      const {data} = await axios.get(keyUri + '/api/setting')

      console.log(data);
      dispatch(getPropertySettingSuccess(data.settings))

  } catch (error) {

dispatch(getPropertySettingError())


      
  }

}
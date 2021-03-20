import React,{ useState} from 'react'
import { Button, Radio, Input } from 'antd';
import axios from 'axios';
import BACK_END_URI from '../../../key';
import {useDispatch, useSelector} from 'react-redux'
import {fetchSettings,  PropertySettingSelector} from '../../../api/propertySettings'

export default function AdminSetting() {

    const [value, setValue] = useState('residential');
    const [text, setText] = useState();

const dispatch = useDispatch()


    const onChange = e => {
      setValue(e.target.value);
    };


    const handleChange = (e) =>{
        setText(e.target.value)
    
        }

     

    const handleClick = () =>{

      

        dispatch(fetchSettings({value, text}))


    }

    return (
        <div>
             <Radio.Group onChange={onChange} value={value} defaultValue="residential" size="middle">
      <Radio.Button value="residential">Residential</Radio.Button>
      <Radio.Button value="commercial">Commercial</Radio.Button>
      <Radio.Button value="warehouse">Warehouse</Radio.Button>
    </Radio.Group> 
    <br/>
    <br/>
    <Input style={{width:"40%"}} onChange={handleChange} placeholder="Basic usage" />
 <br/>
    <br/>
    <Button type="primary" onClick={handleClick}>Submit</Button>
        </div>
    )
}

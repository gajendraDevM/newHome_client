import React,{ useState} from 'react'
import { Button, Radio, Input, message } from 'antd';
import axios from 'axios';
import BACK_END_URI from '../../../key';
import {useDispatch, useSelector} from 'react-redux'
import {fetchSettings,  PropertySettingSelector} from '../../../api/propertySettings'

export default function AdminSetting() {

    const [value, setValue] = useState('residential');
    const [text, setText] = useState();
    const [locality, setLocality] = useState();

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

    const handleLocality = () =>{

  axios.post(BACK_END_URI + '/api/locality', {locality:locality}).then(({data})=>{

    message.success(data.msg)

  }).catch(({response})=>{

    message.error(response.data.msg)
  })

    }


    const Heading = ({title}) =>{

        return <div><h3 className="text-xl ">{title}</h3>
        <hr className=" h-1 mb-4 w-10 bg-brandColor border-none"/>
        </div>
    }

    return (
        <div>
            <Heading title="Add property type"/>
            <div>
             <Radio.Group onChange={onChange} value={value} defaultValue="residential" size="middle">
      <Radio.Button value="residential">Residential</Radio.Button>
      <Radio.Button value="commercial">Commercial</Radio.Button>
      <Radio.Button value="warehouse">Warehouse</Radio.Button>
    </Radio.Group> 
    <br/>
    <br/>

    <Input style={{width:"40%"}} onChange={handleChange} placeholder="Basic usage" />
&nbsp; &nbsp; 
    <Button type="primary" onClick={handleClick}>Submit</Button>
    </div>
<br/>
    <div>

    <Heading title="Add Locality"/>

    <Input   value={locality} style={{width:"40%"}} onChange={(e)=>setLocality(e.target.value)} placeholder="Basic usage" />



  &nbsp;  <Button type="primary" onClick={handleLocality}>Add Locality</Button>

    </div>
        </div>
    )
}

import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllEmployees, employeeSelector} from '../../../../api/empSlice'
import axios from 'axios';
import BACK_END_URI from '../../../../key';


const { Option } = Select
export default function AddSalary() {
  const dispatch = useDispatch()
const [empid, setEmpId] = useState()
  const {loading, employee} = useSelector(employeeSelector)

  useEffect(()=>{

    dispatch(fetchAllEmployees())
    
    
    }, [dispatch])

console.log(empid);

    const onFinish = (values) => {

      let salarydata = {

        sallary:values.salary
      }

      axios.post(BACK_END_URI + `/api/salary/${empid}`, salarydata).then(({data})=>{

       message.success(data.msg)
      }).catch(({response})=>{

        message.error(response.data.msg)
      })

      console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };



    return (
        <div>
            <Form
      name="basic"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 14 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >


<Form.Item name="emolyee_name" label="employee" rules={[{ required: true }]}>
        <Select
        value={empid}
          placeholder="Select emolyee_name"
          allowClear
          onChange={(value)=>setEmpId(value)}
        >
       {

employee.map((item, i)=>{

  return <Option value={item._id} key={i}>{item.employee_name}</Option>
})
       }
     
        </Select>
      </Form.Item>


      <Form.Item
        label="salary"
        name="salary"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>



   

      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form> 
        </div>
    )
}

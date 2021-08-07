import React, {useEffect} from 'react'
import { Form, Input,Row, Col, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {fetchlogin, authenticateSelector} from '../../api/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import adminImg from '../../images/admin.jpg'
import styled from 'styled-components'
export default function Login({history}) {

const dispatch = useDispatch();

const {loading, isAuthenticate } = useSelector(authenticateSelector)
// const {history} = useHistory()

useEffect(()=>{

if(isAuthenticate){

  return  history.push('/dashboard')
} 

}, [isAuthenticate])



    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(fetchlogin(values))
      };




    return (
        <LoginWrap className=" flex items-center  justify-center h-screen">
          <div className="container    ">
<Row>

  <Col span={12}>
  <img src={adminImg} width="80%" className="mx-auto block" alt="admin"/>
  </Col>
  <Col span={12} className="logform">
     
     <div  className="login-form ">
     <hr className="border-none h-1 bg-green-500 w-14 mb-2"/>
     <h3 className="text-3xl mb-8 font-sans text-green-700">Admin Login</h3>

         <Form
      name="normal_login"
    
      style={{width:"450px"}}
      initialValues={{
        remember: true, 
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input   prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
        
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
  

      <Form.Item className="border-none">
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>

      </Form.Item>
    </Form> 
    </div>
    </Col>
</Row>
    </div>
      
        </LoginWrap>
    )
}


const LoginWrap = styled.div`

.ant-input-affix-wrapper > input.ant-input {




box-shadow: none !important;
&:focus{

    border-color:white !important;
}
&:hover{

    border-color:white !important;
}
}

.logform {

  position:relative;

  .login-form {

    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%, -50%);

  svg {

    font-size: 1.2rem !important;
    color: #009c86 !important;
}
    
  }
}


`
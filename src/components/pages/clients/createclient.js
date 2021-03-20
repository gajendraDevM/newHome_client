import React from 'react'
import { Form, Input, Button, Select, Radio, Space } from 'antd';
import {clientSelector, createClient} from '../../../api/clientSlice'
import {useDispatch, useSelector} from 'react-redux'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;



const phoneMsg = ["home", "work", "main", "other"]


const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 10,
    },
  };


  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 10,
    },
  };


  const tail2Layout = {
    wrapperCol: {
      offset: 3,
      span: 10,
    },
  };

  const tail3Layout = {
    wrapperCol: {
      offset: 2,
      span: 10,
    },
  };
export default function Createclient() {

    const [form] = Form.useForm();
 const dispatch = useDispatch()
//  const {loadnig} = useSelector()

    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(createClient(values))
        form.resetFields()
      };


      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


   

    return (
        <div>
                <Form
      {...layout}
      name="basic"
      form={form}
      initialValues={{
        remember: true

      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="client_name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item   
       name="phone_number"
       label="Phone"
       rules={[
         {
           required: true,
           message: 'Please input your phone number!',
         },
       ]}
     >
       <Input
          addonBefore="+91"
          style={{
           width: '100%',
         }}
       />
     </Form.Item>




  

   

 <Form.Item    {...tail2Layout}> 
      <Form.List name="other_phone" >
        {(fields, { add, remove }) => (
          <>

      {fields.map(field => (
              <Space key={field.key}   style={{width:"100%"}}  align="baseline">
              
                <Form.Item
                
                style={{width:"100%"}}
                 {...field}
                 fieldKey={[field.fieldKey, 'phone_number2']}
               
        name={field.name }
        label={ field.name > 3 ? `other${field.name}` :  phoneMsg[field.name]   }
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore="+91"
         
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
             
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
        <Form.Item {...tail3Layout}>
              <Button type="dashed" className="ml-2"   onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>

            </>
        )}
      </Form.List>
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>




      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item name="customer_type" label="Customer_type" rules={[{ required: true }]}>
        <Select
          placeholder="Select Customer type"
          allowClear
        >
          <Option value="Seller">Seller</Option>
          <Option value="Buyer">Buyer</Option>
     
        </Select>
      </Form.Item>

      <Form.Item label="location">
        <Input.Group compact>

        <Form.Item
            name={['location', 'district']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input  style={{ width: '40%' }} placeholder="district" />
          </Form.Item>

          <Form.Item
            name={['location', 'state']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input  style={{ width: '40%', marginLeft:"1rem" }} placeholder="state" />
          </Form.Item>
        </Input.Group>
      </Form.Item>


      <Form.Item label="Property Size">
        <Input.Group compact>

        <Form.Item
            name={['property_size', 'sqft']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input  style={{ width: '30%' }} placeholder="sqft" />
          </Form.Item>

          <Form.Item
            name={['property_size', 'cm']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input  style={{ width: '30%', marginLeft:"1rem" }} placeholder="cm" />
          </Form.Item>

          <Form.Item
            name={['property_size', 'feet']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input  style={{ width: '30%', marginLeft:"1rem" }} placeholder="feet" />
          </Form.Item>

        </Input.Group>
      </Form.Item>


      <Form.Item name="isFurnist" label="furnist">
        <Radio.Group>
          <Radio value="furnista">furnist</Radio>
          <Radio value="non-furnist">non-furnist</Radio>
        
        </Radio.Group>
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}

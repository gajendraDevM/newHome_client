import React, { useEffect } from 'react'
import { Form, Input, Button, Select, Radio } from 'antd';
import {clientSelector, fetchOneClient, editClient} from '../../../api/clientSlice'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
const { Option } = Select;
const { TextArea } = Input;



const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 16,
    },
  };


  const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 16,
    },
  };


export default function Createclient() {

    const [form] = Form.useForm();
 const dispatch = useDispatch()
 const {loadnig, current_client} = useSelector(clientSelector)

const { id } = useParams()

useEffect(()=>{

    dispatch(fetchOneClient(id))

    current_client &&   form.setFieldsValue({
        client_name: current_client.client_name,
        phone_number: current_client.phone_number,
        email: current_client.email,
        address: current_client.address,
        customer_type: current_client.customer_type,

        location: {
            district:current_client.location.district,
            state:current_client.location.state
        },
        
        property_size:{

            sqft:current_client.property_size.sqft,
           cm:current_client.property_size.cm,
           feet:current_client.property_size.feet,

        },
        // isFurnist: current_client && current_client.isFurnist? true : false
    

      });


}, [dispatch])


    const onFinish = (values) => {
        // console.log('Success:', values);


        dispatch(editClient(id, values))
        form.resetFields()
      };


      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <Option value="91">+91</Option>
            <Option value="1">+1</Option>

            <Option value="87">+87</Option>
          </Select>
        </Form.Item>
      );

    return (
        <div>
          
          { current_client &&       <Form
      {...layout}
      name="basic"
      form={form}
      initialValues={{
        remember: true,
        prefix: '91',

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
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
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
          <Option value="male">Seller</Option>
          <Option value="female">Buyer</Option>
     
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


      <Form.Item name="isFurnist"
      label="furnist">
        <Radio.Group>
          <Radio checked={current_client && current_client.isFurnist? true : false} value={true}>furnist</Radio>
          <Radio checked={current_client && current_client.isFurnist? true : false} value={false}>non-furnist</Radio>
        
        </Radio.Group>
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
}
        </div>
    )
}

import React, {useEffect} from 'react'
import { Form, Input, Button, Select, Radio, Space } from 'antd';
import { createClient} from '../../../api/clientSlice'
import {useDispatch, useSelector} from 'react-redux'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {PropertySettingSelector,  fetchAllSettings} from '../../../api/propertySettings'



const { Option } = Select;
const { TextArea } = Input;



const phoneMsg = ["Home", "Office", "Work", "Other"]


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
  const dispatch = useDispatch()


  useEffect(()=>{

    dispatch(fetchAllSettings())
  
  }, [dispatch])




  const { settings } = useSelector(PropertySettingSelector)




    const [form] = Form.useForm();
//  const {loadnig} = useSelector()

    const onFinish = (values) => {

      dispatch(createClient(values))

        form.resetFields()
      };


      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


       const prefixSelector = (
          <Form.Item name="prefix" noStyle>
            <Select defaultValue="Lac" style={{ width: 70 }}>
              <Option value="Lac">Lac</Option>
              <Option value="Cr">Cr</Option>
            </Select>
          </Form.Item>
        );

    return (
        <div>
                <Form
      {...layout}
      name="basic"
      form={form}
      initialValues={{
        remember: true,
        prefix: 'Lac',

      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="client_name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Company Name"
        name="company_name"
      >
        <Input />
      </Form.Item>

           <Form.Item
        label="Client Requirement"
        name="client_requirement"
      >

     <Select style={{ width: 270 }} >
   
   {  settings.map((item, i)=>{

return <option key={i} value={item.property}>{item.property}</option>

})}


    </Select> 



      </Form.Item>

 <Form.Item
        label="Client ID"
        name="client_id"
      >
        <Input />
      </Form.Item>

      <Form.Item   
       name="phone_number"
       label="Phone"
       rules={[{ required: true },
        {min: 10},
        {max:10},
        {pattern:"[0-9]", message:"Only Numbers"}
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
        rules={[{ required: true },
          {min: 10},
          {max:10},
          {pattern:"[0-9]", message:"Only Numbers"}
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
                Add Phone Number
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

      <Form.Item    {...tail2Layout}> 
      <Form.List name="other_emails" >
        {(fields, { add, remove }) => (
          <>

      {fields.map(field => (
              <Space key={field.key}   style={{width:"100%"}}  align="baseline">
              
                <Form.Item
                
                style={{width:"100%"}}
                 {...field}
                 fieldKey={[field.fieldKey, 'other_emails']}
               
        name={field.name }
        label={`Email ${field.name + 1}`}
     
      >
        <Input
  
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
                Add Emails
              </Button>
            </Form.Item>

            </>
        )}
      </Form.List>
      </Form.Item>

      <Form.Item
        label="Budget"
        name={['bugjet_info', 'bugjet_price']}
        rules={[
          {
            required: true,
            message:  ' is Required ',
          },
        ]}
     
      >

     
      <Input
       placeholder="in ruppes" addonBefore={prefixSelector} style={{ width: '50%' }}  />
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
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item name="customer_type" label="Customer_type" rules={[{ required: true }]}>
        <Select
          placeholder="Select Customer type"
          allowClear
        >
          <Option value="Seller">Seller</Option>
          <Option value="Buyer">Buyer</Option>
          <Option value="builder">builder</Option>
          <Option value="agent">agent</Option>
     
        </Select>
      </Form.Item>

      <Form.Item label="location">
        <Input.Group compact>

        <Form.Item
            name={['location', 'locality']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input  style={{ width: '40%' }} placeholder="locality" />
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


      <Form.Item name="isfurnished" label="furnished">
        <Radio.Group>
          <Radio value="furnished">furnished</Radio>
          <Radio value="unfurnished">unfurnished</Radio>
        
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Comment"
        name="comment"
     
      >
        <TextArea rows={3} />
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

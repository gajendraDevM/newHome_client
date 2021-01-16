import React, {useState} from 'react'
import { Form, Input, Upload, Button, Select, Radio } from 'antd';
import {employeeSelector, createEmployee} from '../../../api/empSlice'
import {useDispatch, useSelector} from 'react-redux'
import keyUri from '../../../key'
import { CloudUploadOutlined  } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;



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




export default function CreateEmployeeF() {

    const [form] = Form.useForm();
 const dispatch = useDispatch()

 const [imge, setImge] = useState(null)
 const [id_imge, setIDImge] = useState(null)


//  const {loadnig} = useSelector()

    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(createEmployee(values))
        form.resetFields()
      };



      const handleImage = () =>{

    
        window.cloudinary.openUploadWidget({ cloud_name: "gajendra", upload_preset: "redux_twinepidemic"},
        function(error, result) {
              result && setImge(result[0].url)
            console.log(result);
        })
       
       
         }


      const handleIDImage = () =>{

    
        window.cloudinary.openUploadWidget({ cloud_name: "gajendra", upload_preset: "redux_twinepidemic"},
        function(error, result) {
              result && setIDImge(result[0].url)
            console.log(result);
        })
       
       
         }

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.file;
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
                <Form
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
        label="employee_name"
        name="employee_name"
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
        label="employee_id"
        name="employee_id"
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
        label="designation"
        name="designation"
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
        label="salary_date"
        name="salary_date"
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
        label="sallary"
        name="sallary"
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
        name="image"
        label="Image"
        valuePropName="file"
        getValueFromEvent={normFile}
      >
        {/* <Upload name="image" action={keyUri + `/api/upload`} listType="picture"> */}
          <Button type="primary" onClick={handleImage} icon={<CloudUploadOutlined className=" text-xl text-green-600" />}> upload</Button> <br/>

          {imge && <img className="my-4" src={imge} alt="imgee" width="120px"/>}

        {/* </Upload> */}
      </Form.Item>

      <Form.Item label="employee_images">
        <Input.Group compact>

        <Form.Item
        name="image"
        label="Image"
   
      >
        {/* <Upload name="image" action={keyUri + `/api/upload`} listType="picture"> */}
          <Button type="primary" onClick={handleIDImage} icon={<CloudUploadOutlined className=" text-xl text-green-600" />}> upload</Button> <br/>

          {imge && <img className="my-4" src={id_imge} alt="imgee" width="120px"/>}

        {/* </Upload> */}
      </Form.Item>

      <Form.Item
        name="image_id"
  
   
    
      >
        {/* <Upload name="image" action={keyUri + `/api/upload`} listType="picture"> */}
          <Button type="primary" onClick={handleIDImage} icon={<CloudUploadOutlined className=" text-xl text-green-600" />}> upload</Button> <br/>

          {imge && <img className="my-4" src={imge} alt="imgee" width="120px"/>}

        {/* </Upload> */}
      </Form.Item>


        </Input.Group>
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



      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}

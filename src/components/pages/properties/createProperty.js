import React,{ useEffect, useState} from 'react'
import { Form, Input, Modal, Button, Select, Radio, Space, InputNumber } from 'antd';
import {propertySelector, createproperty} from '../../../api/PropertySlice'
import {useDispatch, useSelector} from 'react-redux'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CloudUploadOutlined  } from '@ant-design/icons';
import {creatPropertySettings, PropertySettingSelector, fetchAllPropertySettings} from '../../../api/propertySettings'
const { Option } = Select;
const { TextArea } = Input;



const phoneMsg = ["home", "work", "main", "other"]


const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 17,
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






export default function CreatePropertySec() {

    const [form] = Form.useForm();
 const dispatch = useDispatch()
 const [value, setValue] = useState('residential');
 const [imge, setImge] = useState([])
 const [isModalVisible, setIsModalVisible] = useState(false);


 const {settings} = useSelector(PropertySettingSelector)


 useEffect(()=>{

  dispatch(fetchAllPropertySettings())
  
  
  }, [dispatch])


console.log(settings);

 const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};


    const onFinish = (values) => {
  
        values.property_gallery = imge
        // values.Price_info.unit =  values.prefix

        dispatch(createproperty(values))
        form.resetFields()
        setImge([])
      };


    const onFinishLocation = (values) => {
  
      console.log(values);
        dispatch(creatPropertySettings(values))
        form.resetFields()
 
      };

 const onFinishFailedLocation = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      const handleImage = () =>{

    
        window.cloudinary.openUploadWidget({ cloud_name: "gajendra", upload_preset: "redux_twinepidemic"},
        function(error, result) {


         result &&  result.map(item =>{


            return setImge(prev=>[...prev, item.url])

          })

          
        })
       
       
         }


         function onChange(value) {
          console.log(`selected ${value}`);
        }
        
        function onBlur() {
          console.log('blur');
        }
        
        function onFocus() {
          console.log('focus');
        }
        
        function onSearch(val) {
          console.log('search:', val);
        }











       

         const onChangeProperty = (e) =>{


          setValue(e.target.value);
         }


         const prefixSelector = (
          <Form.Item name="prefix" noStyle>
            <Select defaultValue="Lac" style={{ width: 70 }}>
              <Option value="Lac">Lac</Option>
              <Option value="Cr">Cr</Option>
            </Select>
          </Form.Item>
        );
 
    return (

        
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
        <div className="grid grid-cols-3">

  <div className=" col-span-2 ">


      <Form.Item
        label="property Title"
        name="property_name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input   placeholder="property name" />
      </Form.Item>


     
      <Form.Item
        label="property Price"
        name={["price_info", "total_price"]}
        rules={[
          {
            required: true,
            message:  ' is Required ',
          },
        ]}
     
      >

     
      <InputNumber 
       placeholder="in Lac" addonBefore={prefixSelector} style={{ width: '50%' }}  />
      </Form.Item>

     



      <Form.Item label="Owner info">
        <Input.Group compact>


        <Form.Item
  
        name={['owner_info', 'contact_by']}
      
      >
        <Input  style={{ width: '100%' }} placeholder="contact_by" />
      </Form.Item>




      <Form.Item
 name={['owner_info', 'email']}

       
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
        <Input  style={{ width: '100%', marginLeft:"2rem", marginRight:"1rem" }} placeholder="email"/>
      </Form.Item>

 

          </Input.Group>
          </Form.Item>


          <Form.Item   
      name={['owner_info', 'phone_number']}
      style={{width:"100%"}}
      label="phone"
   
       rules={[
         {
           required: true,
           message: 'Please input your phone number!',
         },
       ]}
     >
       <Input
          addonBefore="+91"
          placeholder="primary phone Number"
          style={{
           width: '100%'
         }}
         
       />
     </Form.Item>




          <Form.Item style={{marginLeft:"-20px"}}    {...tail2Layout}> 
      <Form.List name={['owner_info', 'other_phone']} >
        {(fields, { add, remove }) => (
          <>

      {fields.map(field => (
              <Space key={field.key}   style={{display:"block"}}  align="center">
              
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
        <MinusCircleOutlined style={{color:"var(--brandColor)"}} className="float-right my-3" onClick={() => remove(field.name)} />
      </Form.Item>
             
                
              </Space>
            ))}
        <Form.Item {...tail3Layout}>
              <Button type="dashed" className="ml-6"   onClick={() => add()} block icon={<PlusOutlined />}>
                Add phone Number
              </Button>
            </Form.Item>

            </>
        )}
      </Form.List>
      </Form.Item>
    

 

{/* 

      <Form.Item label="location">
        <Input.Group compact>

        <Form.Item
            name={['location', 'district']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >

<Select
    showSearch
    style={{ width: '40%' }}
     placeholder="district"
  
    optionFilterProp="children"
    style={{ width: '40%' }}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >

    


   <Option value="Bangalore">Bangalore</Option>
    
    
 
  </Select> */}






            {/* <Input  style={{ width: '40%' }} placeholder="district" /> */}
          {/* </Form.Item>

          <Form.Item
            name={['location', 'state']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >

<Select
    showSearch
    placeholder="state"
    optionFilterProp="children"
    style={{ width: '40%', marginLeft:"1rem" }} 
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    


 <Option value="Karnataka">Karnataka</Option>


  </Select> */}



            {/* <Input  style={{ width: '40%', marginLeft:"1rem" }} placeholder="state" /> */}
         
         
         
          {/* </Form.Item>

        
        </Input.Group>
      </Form.Item>

      <Form.Item label="Locality">
   
      <Select
    showSearch
   
    placeholder="Select Locality"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
   {

settings && settings.map(item =>{
  return <Option value="jack">{item.locality}</Option>
})
}

  </Select>

   </Form.Item>

      <Form.Item label=":">
   
   <Button  onClick={showModal}  icon={<PlusOutlined />} type="dashed">Add New Location</Button>

   </Form.Item>

    */}
      <Form.Item label="Property Info">
        <Input.Group compact>

        <Form.Item
            name={['property_info', 'super_area']}
            noStyle
            rules={[{ required: true, message: 'super_area is required' }]}
          >
            <Input  style={{ width: '30%' }} placeholder="super_area" />
          </Form.Item>

          <Form.Item
            name={['property_info', 'transection_type']}
            noStyle
            rules={[{ required: true, message: 'transection_type is required' }]}
          >
            <Input  style={{ width: '30%', marginLeft:"1rem" }} placeholder="transection_type" />
          </Form.Item>

          <Form.Item
            name={['property_info', 'ownership_type']}
            noStyle
            rules={[{ required: true, message: 'ownership_type is required' }]}
          >

<Select
          
          allowClear
          placeholder="OwnerShip"
          style={{ width: '30%', marginLeft:"1rem" }}
        >
          <Option value="freehold">freehold</Option>
          <Option value="leasehold">leasehold</Option>
          <Option value="Power of Attorney">Power of Attorney</Option>
          <Option value="Co-operative society">Co-operative society</Option>

     
        </Select>

          </Form.Item>


      <Form.Item
            name={['property_info', 'floor']}
            noStyle
            rules={[{ required: true, message: 'floor is required' }]}
          >

<InputNumber  style={{ width: '30%', marginTop:"1.5rem"  }} placeholder="floor" />

       
          </Form.Item>

          <Form.Item
            name={['property_info', 'bed_room']}
            noStyle
            rules={[{ required: true, message: 'bhk is required' }]}
          >
     
     <InputNumber 
      style={{ width: '30%', marginLeft:"1rem",  marginTop:"1.5rem"  }}
       placeholder="bed_room" />

          </Form.Item>


          <Form.Item
            name={['property_info', 'bath_room']}
            noStyle
            rules={[{ required: true, message: 'bath_room is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginLeft:"1rem", marginTop:"1.5rem"}} placeholder="bath_room" />

          </Form.Item>


          <Form.Item
            name={['property_info', 'furnished_status']}
            noStyle
            rules={[{ required: true, message: 'furnished_status is required' }]}
          >
     

        <Select
          placeholder="Select furnished Status"
          allowClear
          style={{ width: '30%',  marginTop:"1.5rem"}}
        >
          <Option value="furnished">furnished</Option>
          <Option value="semi-furnished">semi-furnished</Option>
          <Option value="unfurnished">unfurnished</Option>

     
        </Select>




          </Form.Item>

          <Form.Item
            name={['property_info', 'car_parking']}
            noStyle
            rules={[{ required: true, message: 'car_parking is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginLeft:"1rem", marginTop:"1.5rem" }} placeholder="car_parking" />

          </Form.Item>


  

          <Form.Item
            name={['property_info', 'balconies']}
            noStyle
            rules={[{ required: true, message: 'Balconies is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginLeft:"1rem", marginTop:"1.5rem" }} placeholder="Balconies" />

          </Form.Item>

          
          <Form.Item
            name={['property_info', 'store_room']}
            noStyle
            rules={[{ required: true, message: 'store_room is required' }]}
          >
     
     <InputNumber  style={{ width: '30%',  marginTop:"1.5rem"  }} placeholder="store_room" />

          </Form.Item>

          <Form.Item
            name={['property_info', 'sale_type']}
            noStyle
            rules={[{ required: true, message: ' is required' }]}
          >
     

        <Select
          placeholder="Sale Type"
          allowClear
          style={{ width: '30%',  marginTop:"1.5rem", marginLeft:"1rem"}}
        >
          <Option value="new">New</Option>
          <Option value="re-sale">ReSale</Option>

     
        </Select>




          </Form.Item>


          <Form.Item
            name={['property_info', 'construction_status']}
            noStyle
            rules={[{ required: true, message: 'construction_status is required' }]}
          >
     

        <Select
          placeholder="Select construction Status"
          allowClear
          style={{ width: '30%',  marginTop:"1.5rem", marginLeft:"1rem"}}
        >
          <Option value="ready-to-move">Ready to Move</Option>
          <Option value="Under-Construction">Under Construction</Option>
  

     
        </Select>




          </Form.Item>



        </Input.Group>
      </Form.Item>


      <Form.Item  name={['property_type', 'property_catagory']} label="Property Type">
        <Radio.Group defaultValue="residential" onChange={onChangeProperty}>
          <Radio value="residential">Residential</Radio>
          <Radio value="commercial">Commercial</Radio>
          <Radio value="others">Others</Radio>
        </Radio.Group>
      </Form.Item>


      <Form.Item name={['property_type', 'property_type_info']} label=":">
    
      <Select
          placeholder="Select property type"
          allowClear
          style={{ width: '50%'}}
        >

          {
value === 'residential' && <>
          <Option value="Flat">Flat</Option>
          <Option value="House/villa">House/Villa</Option>
          <Option value="plot/land">Plot/Land</Option> </>

          }

{
value === 'commercial' && <>
          <Option value="office_space">Office Space</Option>
          <Option value="shop/showroom">Shop/Showroom</Option>
          <Option value="commercial land">Commercial Land</Option>

         <Option value="warehouse/godown">Warehouse/Godown</Option>
          <Option value="industriel_building">Industriel Building</Option>
          <Option value="industriel_shed">Industriel Shed</Option> </>


          }
         
{
value === 'others' && <>
          <Option value="agriculture land">Agriculture Land</Option>
          <Option value="form_house">Form House</Option> </>

          }
     
        </Select>


      </Form.Item>






   
    </div>

    <div className=" col-span-1">

    <Form.Item
        name="property_gallery"
      
      >

          <Button type="primary" className="my-6" onClick={handleImage} icon={<CloudUploadOutlined className=" text-xl text-green-600" />}> upload property images</Button> <br/>

<div className="grid grid-cols-5 gap-3">
{

(imge.length > 0 ) && imge.map((item, i)=>{


  return <div key={i} className="">
   <img  className="my-4" src={item} alt="imgee"
    height="70px" 
   className="p-2 mt-4"
   style={{backgroundColor:"#f5f5f5"}}
     width="120px"/>
</div>
})

}
</div>


   
      </Form.Item>


      <Form.Item
  
        name={["owner_info", 'address']}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <TextArea rows={3} placeholder="Address" />
      </Form.Item>


      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'block'}} align="center">
                <Form.Item
                  {...field}
                  name={["owner_info", 'other_address']}

                  fieldKey={[field.fieldKey, 'other_address2']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                <TextArea rows={3} placeholder="Home Address" />
                <MinusCircleOutlined style={{color:"var(--brandColor)"}} className="float-right my-3 " onClick={() => remove(field.name)} />

                </Form.Item>
               
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add other Adress
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>



      <Form.Item name="description"  rules={[{ required: true }]}>
       <TextArea rows={3} placeholder="description"  />
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" className="min-w-full" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </div>
  
        </div>
        <Modal title="Add New Location"
        footer={false}
        visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        
        <Form
  
      name="Add New Location"
      initialValues={{ remember: true }}
      onFinish={onFinishLocation}
      onFinishFailed={onFinishFailedLocation}
    >

<Form.Item
        placeholder="Select District "
        name="district"
        initialValue="bangalore"
        rules={[{ required: true, message: 'is Required' }]}
      >
          <Select defaultValue="bangalore">

            
            <Option value="bangalore">Bangalore</Option>
            <Option value="mysore">Mysore</Option>
            <Option value="hassan">Hassan</Option>
            <Option value="mangalore">Mangalore</Option>
            <Option value="tumkur">Tumkur</Option>

          </Select>
      </Form.Item>


      <Form.Item
      placeholder="Select state "

        name="state"
        initialValue="karnataka"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
          <Select defaultValue="karnataka">
            <Option value="karnataka">karnataka</Option>
          

          </Select>
      </Form.Item>

      <Form.Item
        name="locality"
      
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
         <Input         placeholder="Enter Locality" />
      </Form.Item>

<Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
</Form>

      </Modal>
        </Form>
    )
}

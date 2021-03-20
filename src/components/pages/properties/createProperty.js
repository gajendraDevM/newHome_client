import React,{ useEffect, useState} from 'react'
import { Form, Input, DatePicker, Button, Select, Radio, Space, InputNumber } from 'antd';
import {propertySelector, createproperty} from '../../../api/PropertySlice'
import {clientSelector, fetchAllClients, fetchOneClient} from '../../../api/clientSlice'

import {useDispatch, useSelector} from 'react-redux'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CloudUploadOutlined  } from '@ant-design/icons';
import {PropertySettingSelector, fetchAllSettings, fetchAllPropertySettings} from '../../../api/propertySettings'
const { Option } = Select;
const { TextArea } = Input;



const phoneMsg = ["home", "work", "main", "other"]


const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  

  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 10,
    },
  };







export default function CreatePropertySec() {

    const [form] = Form.useForm();
 const dispatch = useDispatch()
 const [value, setValue] = useState('residential');
 const [imge, setImge] = useState([])

 const [tvalue, setTValue] = useState('rent');
 const [loan, setLoan] = useState('no');


const { settings } = useSelector(PropertySettingSelector)
const { client, current_client } = useSelector(clientSelector)


 useEffect(()=>{

  dispatch(fetchAllPropertySettings())
    dispatch(fetchAllSettings())
    dispatch(fetchAllClients())

  // form.setFields({furnished_status:'furnished'})
  }, [dispatch])


console.log(settings);

let commercial = settings.filter( item=>{

  return item.property_type === 'commercial'

})

let residential = settings.filter( item =>{

  return item.property_type === 'residential'

})

let warehouse = settings.filter(item =>{

  return item.property_type === 'warehouse'

})


    const onFinish = (values) => {
  
        values.property_gallery = imge
         values.property_type.property_catagory = value


        dispatch(createproperty(values))
        // form.resetFields()
        // setImge([])
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

const [fstate, setFState] = useState('furnished')

const fhandleChange =(value) =>{


  setFState(value)

}

const [ existclient, setExistClient ] = useState('new_property')


const ExistClient = (e) =>{

  setExistClient(e.target.value);


}




    const onChangeTProperty = (e) =>{


          setTValue(e.target.value);
         }

       

         const onChangeProperty = (e) =>{


          setValue(e.target.value);
         }

 const handleLoan = (e) =>{


          setLoan(e.target.value);
         }
const [current_c, setCurrentC] = useState(null)

    const handleChangeClient = (value) =>{

      setCurrentC(value)
       dispatch(fetchOneClient(value));

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
        prefix: 'Lac',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        <div className="grid grid-cols-5 ">

  <div className=" col-span-3 pr-3 leftform " style={{overflowY:"auto"}}>


      <Form.Item
        label="project Name"
        name="project_name"
        rules={[
          {
            required: true,
            message: 'Please input your project!',
          },
        ]}
      >
        <Input   placeholder="project name" />
      </Form.Item>


     




      <Form.Item label="Project Address">
      <Input.Group compact>

      <Form.Item
        name={["owner_info", 'city']}
        style={{ border:"none"}} 
       rules={[
          {
            required: true,
            message: 'Please input your city!',
          },
        ]}>
      
      <Input placeholder="city"  />

       </Form.Item>


       <Form.Item
        name={["owner_info", 'locality']}
       rules={[
          {
            required: true,
            message: 'Please input your locality!',
          },
        ]}>
       <Input placeholder="locality" style={{marginLeft:"2rem"}}/>


       </Form.Item>

        </Input.Group>
      </Form.Item>
      <Form.Item
  label=":"
        name={["owner_info", 'address']}
      
      >
        <TextArea rows={3} placeholder="Address" style={{transform:"translateY(-1.5rem)"}} />
      </Form.Item>


      <Form.Item  name={['property_type', 'property_catagory']} label="Property Type">
        <Radio.Group defaultValue="residential" onChange={onChangeProperty}>
          <Radio value="residential">Residential</Radio>
          <Radio value="commercial">Commercial</Radio>
          <Radio value="wharehouse">WhareHouse</Radio>

        
        </Radio.Group>
      </Form.Item>




      <Form.Item name={['property_type', 'property_type_info']} label=":">
    
      <Select
          placeholder="Select property type"
          allowClear
          style={{ width: '50%'}}
        >

          {
value === 'residential' && residential.map((item, i)=>{

  return <option key={i} value={item.property}>{item.property}</option>

})

          }

{
value === 'commercial' && commercial.map((item, i)=>{

  return <option key={i} value={item.property}>{item.property}</option>

})


          }

{
value === 'wharehouse' && warehouse.map((item, i)=>{

  return <option key={i} value={item.property}>{item.property}</option>

})


          }

     
        </Select>


      </Form.Item>
        


      <Form.Item  name={['property_type', 'client_catagory']} label="Client Type">
        <Radio.Group defaultValue="rent" onChange={onChangeTProperty}>
          <Radio value="rent">Rent</Radio>
          <Radio value="lease">Lease</Radio>
          <Radio value="seller">Seller</Radio>

        </Radio.Group>
      </Form.Item>

{ (tvalue === 'seller') &&  <>   <Form.Item  label="Bank Loan">
        <Radio.Group  onChange={handleLoan} value={loan} >
          <Radio value="yes">yes</Radio>
          <Radio value="no">no</Radio>
     

        </Radio.Group>
      </Form.Item>
      
 
</>
      
      }


{

(loan === 'yes') &&  <Form.Item  name='loan_amount' label="Bank Loan">
      <Input placeholder="loan amount" style={{width:"50%"}}/>

      </Form.Item>
    } 


      <Form.Item
        label="property Price"
        name={["property_info", "project_price"]}
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




      <Form.Item label="Property Info">



        <Input.Group compact>

        <Form.Item
            name={['property_info', 'site_area']}
            noStyle
            rules={[{ required: true, message: 'site_area is required' }]}
          >
            <Input  style={{ width: '30%' }} placeholder="site_area in sqft" />
          </Form.Item>

          <Form.Item
            name={['property_info', 'builtup_area']}
            noStyle
            rules={[{ required: true, message: 'Builtup is required' }]}
          >
            <Input  style={{ width: '30%', marginLeft:"1rem" }} placeholder="Builtup in sqft" />
          </Form.Item>


          <Form.Item
            name={['property_info', 'offered_area']}
            noStyle
            rules={[{ required: true, message: 'offered_area is required' }]}
          >
            <Input  style={{ width: '30%', marginLeft:"1rem" }} placeholder="offered_area in sqft" />
          </Form.Item>

        <Form.Item
            name={['property_info', 'rent']}
            noStyle
            rules={[{ required: true, message: 'rent is required' }]}
          >
            <Input  style={{ width: '30%', marginTop:"1.5rem" }} placeholder="rent in sqft" />
          </Form.Item>

          <Form.Item
            name={['property_info', 'deposit']}
            noStyle
            rules={[{ required: true, message: 'deposit is required' }]}
          >
            <Input  style={{ width: '30%', marginTop:"1.5rem", marginLeft:"1rem" }} placeholder="deposit" />
          </Form.Item>


          <Form.Item
            name={['property_info', 'property_age']}
            noStyle
            rules={[{ required: true, message: 'property_age is required' }]}
          >
            <Input  style={{ width: '30%', marginTop:"1.5rem", marginLeft:"1rem" }} placeholder="property_age" />
          </Form.Item>


          <Form.Item
            name={['property_info', 'notice_period']}
            noStyle
            rules={[{ required: true, message: 'notice_period is required' }]}
          >
            <Input  style={{ width: '30%', marginTop:"1.5rem" }} placeholder="notice_period" />
          </Form.Item>

          <Form.Item
            name={['property_info', 'total_floor']}
            noStyle
            rules={[{ required: true, message: 'total floor is required' }]}
          >
            <Input  style={{ width: '30%', marginTop:"1.5rem",  marginLeft:"1rem" }} placeholder="total floor" />
          </Form.Item>


          <Form.Item
            name={['property_info', 'escalation']}
            noStyle
            rules={[{ required: true, message: 'escalation is required' }]}
          >
            <Input  style={{ width: '30%', marginTop:"1.5rem", marginLeft:"1rem" }} placeholder="escalation" />
          </Form.Item>


          <Form.Item
            name={['property_info', 'build_effeciency']}
            noStyle
            rules={[{ required: true, message: 'build_effeciency is required' }]}
          >
            <Input  style={{ width: '30%', marginTop:"1.5rem" }} placeholder="build_effeciency" />
          </Form.Item>


          <Form.Item
            name={['property_info', 'power']}
            noStyle
            rules={[{ required: true, message: 'power is required' }]}
          >
            <Input  style={{ width: '30%',marginTop:"1.5rem", marginLeft:"1rem" }} placeholder="power in Kva" />
          </Form.Item>
          
  <Form.Item
            name={['property_info', 'property_facing']}
            noStyle
            rules={[{ required: true, message: 'property_facing is required' }]}
          >
            <Input  style={{ width: '30%',marginTop:"1.5rem", marginLeft:"1rem" }} placeholder="property_facing " />
          </Form.Item>

          <Form.Item
            name={['property_info', 'water']}
            noStyle
            rules={[{ required: true, message: 'water is required' }]}
          >
            <Input  style={{ width: '30%', marginTop:"1.5rem" }} placeholder="water " />
          </Form.Item>


 <Form.Item
            name={['property_info', 'rent_free_period']}
            noStyle
            rules={[{ required: true, message: 'rent_free_period is required' }]}
          >
            <Input  style={{ width: '30%', marginLeft:"1rem", marginTop:"1.5rem" }} placeholder="rent_free_period in months " />
          </Form.Item>

 <Form.Item
            name={['property_info', 'lock_in']}
            noStyle
            rules={[{ required: true, message: 'lock_in is required' }]}
          >
            <Input  style={{ width: '30%', marginLeft:"1rem", marginTop:"1.5rem" }} placeholder="lock-in in years " />
          </Form.Item>


 

          

          <Form.Item
            name={['property_info', 'ownership_type']}
            noStyle
            rules={[{ required: true, message: 'OwnerShip is required' }]}
          >

<Select
          
          allowClear
          placeholder="OwnerShip"
          style={{ width: '30%', marginTop:"1.5rem", border:"none" }}
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

<InputNumber  style={{ width: '30%', marginTop:"1.5rem", marginLeft:"1rem"  }} placeholder="floor" />

       
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
     
     <InputNumber  style={{ width: '30%', marginTop:"1.5rem"}} placeholder="bath_room" />

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
     
     <InputNumber  style={{ width: '30%', marginTop:"1.5rem", marginLeft:"1rem" }} placeholder="Balconies" />

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
          style={{ width: '30%', border:"none",  marginTop:"1.5rem", marginLeft:"1rem"}}
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
          placeholder="Possession"
          allowClear
          style={{ width: '30%', border:"none",  marginTop:"1.5rem", marginLeft:"1rem"}}
        >
          <Option value="ready-to-move">Ready to Move</Option>
          <Option value="Under-Construction">Under Construction</Option>
  

     
        </Select>




          </Form.Item>

     { (value === 'residential') && <>   <Form.Item
            name={['property_info', 'servent_room']}
            noStyle
            rules={[{ required: true, message: 'Balconies is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginTop:"1.5rem" }} placeholder="servent_room" />

          </Form.Item>


          <Form.Item
            name={['property_info', 'servent_room_bathroom']}
            noStyle
            rules={[{ required: true, message: 'servent_room is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginTop:"1.5rem", marginLeft:"1rem" }} placeholder="servent_room_bathroom" />

          </Form.Item> </>}

        </Input.Group>
      </Form.Item>


<Form.Item label=":">

      <Form.Item  className=""  name={['property_type', 'power_type']} label="is UPS">
        <Radio.Group defaultValue="Kva" onChange={onChangeTProperty}>
          <Radio value="UPS">UPS</Radio>
          <Radio value="Kva">Kva</Radio>
     

        </Radio.Group>
      </Form.Item>

 


      <Form.Item  name={['property_type', 'Signage']} label="Signage">
        <Radio.Group defaultValue="yes">
          <Radio value="yes">yes</Radio>
          <Radio value="no">no</Radio>
     

        </Radio.Group>
      </Form.Item>

   <Form.Item  name={['property_type', 'vastu']} label="vastu">
        <Radio.Group defaultValue="yes">
          <Radio value="yes">yes</Radio>
          <Radio value="no">no</Radio>
     

        </Radio.Group>
      </Form.Item>

      <Form.Item  name={['property_type', 'corner_type']} label="Corner type">
        <Radio.Group defaultValue="yes" >
          <Radio value="yes">yes</Radio>
          <Radio value="no">no</Radio>
     

        </Radio.Group>
      </Form.Item>

<Form.Item
name='furnished_info'
>


<Form.Item

    name={['furnished_info', 'furnished_status']}
     noStyle
    rules={[{ required: true, message: 'furnished_status is required' }]}
    initialValue="furnished"

          >
     

        <Select
          placeholder="Select furnished Status"
          allowClear
          onChange={fhandleChange}
          style={{ width: '60%',  marginTop:"1.5rem"}}
          value={fstate}
        >
          <Option value="furnished">furnished</Option>
          <Option value="semi-furnished">semi-furnished</Option>
          <Option value="unfurnished">unfurnished</Option>

     
        </Select>

          </Form.Item>

{

  (fstate !== 'unfurnished') && 

<Input.Group compact>
          <Form.Item
            name={['furnished_info', 'work_station']}
            noStyle
            rules={[{ required: true, message: 'work_station is required' }]}
          >
     
     <InputNumber  style={{ width: '30%',  marginTop:"1.5rem" }} placeholder="work_station" />

          </Form.Item>


          <Form.Item
            name={['furnished_info', 'manager_cabin']}
            noStyle
            rules={[{ required: true, message: 'work_station is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginLeft:"1rem", marginTop:"1.5rem" }} placeholder="manager_cabin" />

          </Form.Item>

          <Form.Item
            name={['furnished_info', 'discussion_room']}
            noStyle
            rules={[{ required: true, message: 'discussion_room is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginLeft:"1rem", marginTop:"1.5rem" }} placeholder="discussion_room" />

          </Form.Item>

    

          <Form.Item
            name={['furnished_info', 'conference_room']}
            noStyle
            rules={[{ required: true, message: 'conference_room is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginTop:"1.5rem" }} placeholder="conference_room" />

          </Form.Item>


        


          <Form.Item
            name={['furnished_info', 'training_room']}
            noStyle
            rules={[{ required: true, message: 'training_room is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginLeft:"1rem", marginTop:"1.5rem" }} placeholder="training_room" />

          </Form.Item>

          <Form.Item
            name={['furnished_info', 'board_room']}
            noStyle
            rules={[{ required: true,  message: 'board_room is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginLeft:"1rem",  marginTop:"1.5rem" }} placeholder="board_room" />

          </Form.Item>



          <Form.Item
            name={['furnished_info', 'electrical_room']}
            noStyle
            rules={[{ required: true, message: 'electrical_room is required' }]}
          >
     
     <InputNumber  style={{ width: '30%',  marginTop:"1.5rem" }} placeholder="electrical_room" />

          </Form.Item>

          <Form.Item
            name={['furnished_info', 'server_room']}
            noStyle
            rules={[{ required: true, message: 'server_room is required' }]}
          >
     
     <InputNumber  style={{ width: '30%', marginLeft:"1rem", marginTop:"1.5rem" }} placeholder="server_room" />

          </Form.Item>



     


          <Form.Item
            name={['furnished_info', 'EPABX']}
            noStyle
            rules={[{ required: true, message: 'EPABX is required' }]}
          >
     
     <Input  style={{ width: '30%',  marginLeft:"1rem", marginTop:"1.5rem" }} placeholder="EPABX" />

          </Form.Item>



          <Form.Item
            name={['furnished_info', 'project_head']}
            noStyle
            rules={[{ required: true, message: 'project_head is required' }]}
          >
     
     <Input  style={{ width: '30%', marginTop:"1.5rem" }} placeholder="project_head" />

          </Form.Item>




          <Form.Item
            name={['furnished_info', 'airconditioning']}
            noStyle
            rules={[{ required: true, message: 'airconditioning is required' }]}
          >
     
     <Input  style={{ width: '30%', marginLeft:"1rem",  marginTop:"1.5rem" }} placeholder="airconditioning" />

          </Form.Item>


          <Form.Item
            name={['furnished_info', 'pantry']}
            noStyle
            rules={[{ required: true, message: 'pantry is required' }]}
          >
     
     <Input  style={{ width: '30%',  marginLeft:"1rem",  marginTop:"1.5rem" }} placeholder="pantry" />

          </Form.Item>


          <Form.Item
            name={['furnished_info', 'date_of_furnishing']}
            noStyle
            rules={[{ required: true, message: 'date_of_furnishing is required' }]}
          >
     
     <DatePicker style={{ width: '30%',  marginTop:"1.5rem" }} placeholder="date_of_furnishing" />
     {/* <Input   /> */}

          </Form.Item>







      </Input.Group>

}
</Form.Item>
</Form.Item>


   
    </div>

    <div style={{height:"84vh", overflowY:"auto", backgroundColor:"#e4d0d06b"}} className="flex justify-center   col-span-2 pl-3">

<div  className="w-full">
    <Form.Item
        name="property_gallery"
      
      >

          <Button type="primary" className="mt-5 mb-2" onClick={handleImage} icon={<CloudUploadOutlined className=" text-xl text-green-600" />}> upload property images</Button> <br/>

<div className="grid grid-cols-5 gap-3 ">
{

(imge.length > 0 ) && imge.map((item, i)=>{


  return <div key={i} >
   <img   src={item} alt="imgee"
    height="90px" 
   className="p-1 mt-2"
   style={{backgroundColor:"#f5f5f5"}}
     width="150px"/>
</div>
})

}
</div>


   
      </Form.Item>


      <Form.Item>

      <Radio.Group onChange={ExistClient} value={existclient}  size="middle">
      <Radio.Button value="new_property">New Property</Radio.Button>
      <Radio.Button value="exist_property">Exist Client Property</Radio.Button>
 
    </Radio.Group> 
        
      </Form.Item>


      {
     existclient === 'exist_property' && <>

      <Form.Item >

        <Select placeholder="Client Name" value={current_c} style={{ width:'100%'}} onChange={handleChangeClient}>
      {
        client.map((item, i)=>{

          return  <Option key={i}  value={item._id}>{item.client_name}</Option>

 
        })
      
      }
    </Select>

      </Form.Item>


      {  ( current_c   && current_client) && <div>
       
       <p>client_name:&nbsp;<b>{ current_client.client_name}</b></p>
       <p>phone_number:&nbsp;<b>{ current_client.phone_number}</b></p>
       <p>email:&nbsp;<b>{ current_client.email}</b></p>
       <p>address:&nbsp;<b>{ current_client.address}</b></p>
       <p>customer_type:&nbsp;<b>{ current_client.customer_type}</b></p>

      </div>}



     
      <Form.Item >

       <Input name="refference" placeholder="Refrence"/>

      </Form.Item>



      
       </>

      }
      

{

existclient === 'new_property' && 
<>
<Form.Item name="owner_info">
     


<Form.Item

name={['owner_info', 'contact_by']}

>
<Input  style={{ width: '100%' }} placeholder="contact_by" />
</Form.Item>

<Form.Item   
name={['owner_info', 'phone_number']}
placeholder="phone_number"


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

<Form.Item > 
<Form.List name={['owner_info', 'other_phone']} >
{(fields, { add, remove }) => (
  <>

{fields.map(field => (
      <Space key={field.key}   style={{display:"block"}}  align="center">
      
        <Form.Item
        
        style={{width:"100%"}}
         {...field}
         fieldKey={[field.fieldKey, 'other_phone']}
       
name={field.name }
label={ field.name > 3 ? `other${field.name}` :  phoneMsg[field.name]   }

>
<Input
  addonBefore="+91"
 
  style={{
    width: '100%',
  }}
/>
<MinusCircleOutlined style={{color:"var(--brandColor)"}} className="float-right mt-2" onClick={() => remove(field.name)} />
</Form.Item>
     
        
      </Space>
    ))}


<Form.Item >
      <Button type="dashed"     onClick={() => add()} block icon={<PlusOutlined />}>
        Add phone Number
      </Button>
    </Form.Item>

    </>
)}
</Form.List>
</Form.Item>
</Form.Item>







<Input.Group compact>

<Form.Item
name={["owner_info", 'keys']}
style={{border:"none"}}

rules={[
  {
    required: true,
    message: 'Please input your keys!',
  },
]}>

<InputNumber  style={{ width: '100%', border:"none" }} placeholder="keys" />

</Form.Item>



<Form.Item
name={["owner_info", 'key_relation']}
style={{border:"none"}}
rules={[
  {
    required: true,
    message: 'Please input your key_relation!',
  },
]}>

<Input  style={{ width: '100%' }} placeholder="key_relation" />

</Form.Item>


<Form.Item
name={["owner_info", 'service_charges']}
style={{border:"none"}}

rules={[
  {
    required: true,
    message: 'Please input your service_charges!',
  },
]}>

<InputNumber  style={{ width: '97%', border:"none" }} placeholder="service_charges" />

</Form.Item>
</Input.Group>



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
<Input  style={{ width: '100%' }} placeholder="email"/>
</Form.Item>




<Form.Item
name={["owner_info", 'land_mark']}
rules={[
  {
    required: true,
    message: 'Please input your land_mark!',
  },
]}>

<Input placeholder="land_mark" />

</Form.Item>




<Form.Item

name={["owner_info", 'owner_locality']}
rules={[
  {
    required: true,
    message: 'Please input your locality!',
  },
]}>
                <Input placeholder="locality" />


</Form.Item>

<Form.Item

name={["owner_info", 'owner_address']}
rules={[
  {
    required: true,
    message: 'Please input your username!',
  },
]}
>
<TextArea rows={3} placeholder="Address" />
</Form.Item>



<Form.Item name="description"  rules={[{ required: true }]}>
<TextArea rows={3} placeholder="description"  />
</Form.Item>
</>

}

     

      <Form.Item {...tailLayout}>
        <Button type="primary" className="min-w-full" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </div>
    </div>
  
        </div>
   
        </Form>
    )
}

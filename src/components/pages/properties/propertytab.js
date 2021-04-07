import React, { useEffect, useState } from 'react'
import { Tabs, Row, Slider, Modal, Image, Col, Radio, Button, Drawer } from 'antd';
import { fetchAllpropertys, fetchFilter, fethFilterWithBetween, propertySelector } from '../../../api/PropertySlice'
import { useDispatch, useSelector } from 'react-redux';
import SpinLoading from '../../shared/spin';
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { Input, Space , Switch } from 'antd';
import SearchSelect from '../../shared/filter/selectSearch'
import { Empty } from 'antd';
import empltyimg from '../../../images/property.png'
const { Search } = Input;
 const { TabPane } = Tabs;



export default function Propertytab() {

const dispatch = useDispatch()
const {loading, property} = useSelector(propertySelector)
const [isModalVisible, setIsModalVisible] = useState(false);
const [tabkey, setTabkey] = useState(false);
const [filterProperty, setFilterProperty] = useState([])

const [filterActive, setFilterActive] = useState(false)
const [gallery, setGallery] = useState([])
   useEffect(()=>{


    dispatch(fetchAllpropertys())


   }, [dispatch])

function callback(key) {

  setTabkey(key)
  setFilterActive(false)
  dispatch(fetchAllpropertys(key))


}

const viewGallery = (property_gallery) =>{

setIsModalVisible(true);
setGallery(property_gallery);


}

const PropertyCard = ({property_gallery,owner_info, property_type, property_name,price_info, furnished_info,  property_info}) =>{

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };




  return <PropertyCardWrap 
    style={{backgroundColor:"#f9f9f9",  marginBottom:"1.5rem"}} 
     className="grid gap-3 grid-cols-5 overflow-hidden  " >

<motion.div 
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    onClick={()=>viewGallery(property_gallery)}
className=" col-span-1 overflow-hidden bg-cover  "
 style={{backgroundImage:`url('${property_gallery[0]}')`, cursor:"zoom-in"}}>



</motion.div>
<div className=" col-span-4 px-3 py-3" >

<div className="flex justify-between items-center">
<div className="flex justify-start items-center ">
<h5 className="text-xl text-brandColor">{property_name}</h5>
  
<p ><b>Price:</b>&nbsp;<span>&#8377;</span>&nbsp;{property_info.project_price}{property_info.price_unit}</p>

<Button onClick={showDrawer} className="ml-4" size="small" type="primary">View More</Button>

</div>

<div>
<p><b>Address:</b>&nbsp;{owner_info.address} <br/>
            {owner_info.phone_number} &nbsp; {owner_info.email}  </p>

</div>
</div>


<div className="flex justify-between items-center p-2 mt-3" 
style={{backgroundColor:"var(--backgroundColor)",borderRadius:"5px", borderRight:"3px solid #B4002F"}} >


<div>
<h6>Site Area</h6>
<p>{property_info.site_area}&nbsp; sqft</p>

</div>

<div>
<h6>category</h6>
<p>{property_type.property_catagory}</p>

</div>

<div>
<h6>property type</h6>
<p>{property_type.property_type_info}</p>

</div>

{/* <div>
<h6>Transection</h6>
<p>{property_info.transection_type}</p>

</div> */}


<div>
<h6>OwnerShip</h6>
<p>{property_info.ownership_type}</p>

</div>

<div>
<h6>Sale Type</h6>
<p>{property_info.sale_type}</p>

</div>

<div>
<h6>Possession</h6>
<p>{property_info.construction_status}</p>

</div>
</div>









<div className="flex justify-between items-center p-1 mt-3 " 
style={{backgroundColor:"#f5f5f5",borderRadius:"5px", borderRight:"3px solid grey"}} >





<div>
<h6>Bed Room</h6>
<p>2</p>

</div>

<div>
<h6>Bath Room</h6>
<p>{property_info.bath_room}</p>

</div>

<div>
<h6>Store Room</h6>
<p>{property_info.store_room}</p>

</div>
<div>
<h6>floor</h6>
<p>{property_info.floor}</p>

</div>

<div>
<h6>Car Parking</h6>
<p>{property_info.car_parking}</p>

</div>

<div>
<h6>Balconies</h6>
<p>{property_info.balconies}</p>

</div>

<div>
<h6>Furnished Status</h6>
<p>{furnished_info && furnished_info.furnished_status}</p>

</div>


</div>

</div>


<Modal width={1000} footer={false}


 title="Property Gallery" visible={isModalVisible} 
 onCancel={()=>setIsModalVisible(false)}>
  <div className="grid grid-cols-2 gap-5 ">
     {

gallery.length > 0 && gallery.map((item, i)=>{


  return <div key={i}>
   <Image
      width="100%"
      src={item}
    
    />
   
  </div>


})
     }
     </div>
      </Modal>
  
  
  <Drawer    
        placement="right"
        width="45%"
        closable={false}
        onClose={onClose}
        visible={visible}>


<h2 className="text-md p-2 rounded mb-3 " style={{backgroundColor:"var(--backgroundColor)"}}>Owner Info</h2>


<div className="grid grid-cols-4 gap-3 p_name">

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>email</p>
  <b>{owner_info.email}</b>

</div>

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>
keys</p>
  <b>{owner_info.keys}</b>

</div>

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>
phone_number</p>
  <b>{owner_info.phone_number}</b>

</div>




<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>
key_relation</p>
  <b>{owner_info.key_relation}</b>

</div>

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>
service_charges</p>
  <b>{owner_info.service_charges}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>
owner_locality</p>
  <b>{owner_info.owner_locality}</b>

</div>
  
</div>

<br/>
<br/>


<h2 style={{backgroundColor:"var(--backgroundColor)"}} className="text-md p-2 rounded mb-3" >Property Info</h2>
<div className="grid grid-cols-4 gap-3 p_name">

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>site area</p>
  <b>{property_info.site_area}</b>

</div>

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>built area</p>
<b>{property_info.builtup_area}</b>

</div>



<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>site area</p>
<b>{property_info.site_area}</b>

</div>

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>rent</p>
<b>{property_info.rent}</b>

</div>



<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>Deposite</p>
<b>{property_info.deposit}</b>

</div>

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>power</p>
<b>{property_info.power}</b>

</div>

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>build_effeciency</p>
<b>{property_info.build_effeciency}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>escalation</p>
<b>{property_info.escalation}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>ownership_type</p>
<b>{property_info.ownership_type}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>lock_in</p>
<b>{property_info.lock_in}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>rent_free_period</p>
<b>{property_info.rent_free_period}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>Notice Period</p>
<b>{property_info.notice_period}</b>

</div>



<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>sale_type</p>
<b>{property_info.sale_type}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>store_room</p>
<b>{property_info.store_room}</b>

</div>



<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>balconies</p>
<b>{property_info.balconies}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>property_facing</p>
<b>{property_info.property_facing}</b>

</div>



<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>car_parking</p>
<b>{property_info.car_parking}</b>

</div>



<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>bath_room</p>
<b>{property_info.bath_room}</b>

</div>



<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>bed_room</p>
<b>{property_info.bed_room}</b>

</div>






<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>floor</p>
<b>{property_info.floor}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>total_floor</p>
<b>{property_info.total_floor}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>construction_status</p>
<b>{property_info.construction_status}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>property_age</p>
<b>{property_info.property_age}</b>

</div>

</div>

<br/>
<br/>
{/* 
<h2
style={{backgroundColor:"var(--backgroundColor)"}}
 className="text-md p-2 rounded mb-3" >Furnished Info</h2>
<div className="grid grid-cols-4 gap-3 p_name">

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>furnished_status</p>
  <b>{furnished_info && furnished_info.furnished_status}</b>

</div>

{

furnished_info.furnished_status !== "unfurnished" && <>
<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>discussion_room</p>
  <b>{furnished_info.discussion_room}</b>

</div>

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>board_room</p>
  <b>{furnished_info.board_room}</b>

</div>

<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>training_room</p>
  <b>{furnished_info.training_room}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>conference_room</p>
  <b>{furnished_info.conference_room}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>electrical_room</p>
  <b>{furnished_info.electrical_room}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>server_room</p>
  <b>{furnished_info.server_room}</b>

</div>



<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>EPABX</p>
  <b>{furnished_info.EPABX}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>pantry</p>
  <b>{furnished_info.pantry}</b>

</div>



<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>airconditioning</p>
  <b>{furnished_info.airconditioning}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>project_head</p>
  <b>{furnished_info.project_head}</b>

</div>


<div className=" px-2 shadow" style={{backgroundColor:"#f5f5f5"}}>

<p style={{color:"", margin:"0", fontWeight:"semi-bold"}}>date_of_furnishing</p>
  <b>{furnished_info.date_of_furnishing}</b>

</div>


</>

}
</div> */}


  </Drawer>
  
  </PropertyCardWrap>

}


const PropertyCardWrap = styled.div`
 /* box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12); */
border-radius:1rem;



p{

  margin-bottom:0;
  text-align:center;
  font-size:0.8rem;
}
h6{

  font-size:0.8rem;
}

`

const [client_type, setClient] = useState('rent')
const [bhk, setBhk] = useState()


const onAfterChange  = (value, filter) => {

  
  dispatch(fetchFilter(client_type, bhk, value)) 

}

const activeFilter = (checked, currFilter) =>{


  if(checked) {

  setFilterActive(true)
  } else {

    setFilterActive(false)


  }


}

let L = (client_type === 'seller') ? 'Cr' : 'L'


const handleFilterBHK = (value) =>{

  setBhk(value)
  dispatch(fetchFilter(client_type, value)) 

}


const onChange = e => {

 dispatch(fetchFilter(e.target.value)) 

  setClient(e.target.value);
  


};

    return (
        <Row gutter={20}>
          <Col span={18}  style={{height:"85vh", overflowY:"auto"}}>
  <Tabs defaultActiveKey="null" onChange={callback}>


  <TabPane tab="All Property"    key="null">
      
    {


    loading ? <SpinLoading/> : filterActive ? property.length < 1 ? <Empty 
    image={<img className="block mx-auto mt-10 opacity-40" src={empltyimg} alt="empty" />}
    description={<h5 className="text-xl opacity-20" >No Property Availaible!</h5>}/> : property.map((item, i)=>{

   

      return  <PropertyCard {...item} key={i}/>  

    }) :   property.map((item, i)=>{

    
      return <PropertyCard {...item} key={i}/>

    })
  }
    </TabPane>








    <TabPane tab="Commercial" key="commercial">
      
    {


    loading ? <SpinLoading/> : filterActive ? property.length < 1 ? <Empty 
    image={<img className="block mx-auto mt-10 opacity-40" src={empltyimg} alt="empty" />}
    description={<h5 className="text-xl opacity-20" >No Property Availaible!</h5>}/> : property.map((item, i)=>{

      return  <PropertyCard {...item} key={i}/>  

    }) :   property.map((item, i)=>{

    
      return <PropertyCard {...item} key={i}/>

    })
  }
    </TabPane>
    <TabPane tab="Residential" key="residential">
    {
    loading ? <SpinLoading/> : filterActive ? filterProperty.map((item, i)=>{


      return filterProperty.length > 0 ? <PropertyCard {...item} key={i}/> : <h5 className="my-10">No Property Availaible !</h5>

    }) :   property.map((item, i)=>{


      return <PropertyCard {...item} key={i}/>

    })
  }
    </TabPane>

    <TabPane tab="Wharehouse" key="wharehouse">
    {
    loading ? <SpinLoading/> : filterActive ? property.map((item, i)=>{


      return property.length > 0 ? <PropertyCard {...item} key={i}/> : <h5 className="my-10">No Property Availaible !</h5>

    }) :   property.map((item, i)=>{


      return <PropertyCard {...item} key={i}/>

    })
  }
    </TabPane>

  </Tabs>
 </Col>

 <Col span={6} >
 
 <h1>Filtering</h1>
 <h4 className="my-5 ml-2">Applay Filter &nbsp; <Switch size="small"  onChange={(checked)=>activeFilter(checked, 'price') } /></h4>


 <Radio.Group disabled={filterActive? false : true} onChange={onChange} value={client_type} defaultValue="residential" size="middle">
      <Radio.Button value="rent">Rent</Radio.Button>
      <Radio.Button value="lease">Lease</Radio.Button>
      <Radio.Button value="seller">Seller</Radio.Button>
    </Radio.Group> 

<br/>
<br/>
<SearchSelect tabtitle={tabkey} filter="furnished_status" client_type={client_type}/>

<br/><br/>

<h4>Filter By BedRoom</h4>
<Slider
   disabled={filterActive ? false : true}
   step={1}
      min={1}
      max={10}
    defaultValue={2}
      onAfterChange={handleFilterBHK}
      marks ={
        {2: '2',
         4:'4',
         6:'6',
         8:'8',
         10:'10'

       
       
        }}

    />

<br/><br/>

<Slider
disabled={filterActive? false : true}
      range
      step={10}
      marks ={
        {5: '5' + L,
        20:'20' + L,
         40:'40'+ L,
         60:'60'+ L,
         80:'80'+ L,
         100:'100' + L + '+',
       
       
        }

      }
     
      defaultValue={[5, 20]}
      
      onAfterChange={(value)=>onAfterChange(value, 'total_price')}
    /> 

<br/><br/>




 
 </Col>
        </Row>
    )
}



const PropertyTabWrap = styled.div `






`
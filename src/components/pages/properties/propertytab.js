import React, { useEffect, useState } from 'react'
import { Tabs, Row, Slider, Modal, Image, Col, Select } from 'antd';
import { fetchAllpropertys, fethFilterWithBetween, propertySelector } from '../../../api/PropertySlice'
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
const [currentTab, setCurrentTab] = useState([])
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


const PropertyCard = ({property_gallery,owner_info, property_type, property_name,price_info, property_info}) =>{



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
<div className=" col-span-4 px-3 py-3">

<div className="flex justify-between items-center">
<div>
<h5 className="text-xl text-brandColor">{property_name}</h5>
  
<p ><b>Price:</b>&nbsp;<span>&#8377;</span>&nbsp;{price_info.total_price}</p>

</div>

<div>
<p><b>Address:</b>&nbsp;{owner_info.address} <br/>
            {owner_info.phone_number} &nbsp; {owner_info.email}  </p>

</div>
</div>


<div className="flex justify-between items-center p-2 mt-3" 
style={{backgroundColor:"var(--backgroundColor)",borderRadius:"5px", borderRight:"3px solid #B4002F"}} >


<div>
<h6>Super Area</h6>
<p>{property_info.super_area}&nbsp; sqft</p>

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
<h6>Sale Type</h6>
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
<h6>Furnishing</h6>
<p>{property_info.furnished_status}</p>

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




const onAfterChange  = (value, filter) => {

 

  const f = property.filter(item =>{


    return item.price_info.total_price <= value[1] && item.price_info.total_price >= value[0]

  })

 

setFilterProperty(f)

}

const activeFilter = (checked, currFilter) =>{

  console.log(checked, currFilter);

  if(checked) {

  setFilterActive(true)
  } else {

    setFilterActive(false)


  }


}




    return (
        <Row gutter={20}>
          <Col span={18}  style={{height:"85vh", overflowY:"auto"}}>
  <Tabs defaultActiveKey="null" onChange={callback}>


  <TabPane tab="All Property"    key="null">
      
    {


    loading ? <SpinLoading/> : filterActive ? filterProperty.length < 1 ? <Empty 
    image={<img className="block mx-auto mt-10 opacity-40" src={empltyimg} alt="empty" />}
    description={<h5 className="text-xl opacity-20" >No Property Availaible!</h5>}/> : filterProperty.map((item, i)=>{

   

      return  <PropertyCard {...item} key={i}/>  

    }) :   property.map((item, i)=>{

    
      return <PropertyCard {...item} key={i}/>

    })
  }
    </TabPane>








    <TabPane tab="Builder"    key="builder">
      
    {


    loading ? <SpinLoading/> : filterActive ? filterProperty.length < 1 ? <Empty 
    image={<img className="block mx-auto mt-10 opacity-40" src={empltyimg} alt="empty" />}
    description={<h5 className="text-xl opacity-20" >No Property Availaible!</h5>}/> : filterProperty.map((item, i)=>{

   

      return  <PropertyCard {...item} key={i}/>  

    }) :   property.map((item, i)=>{

    
      return <PropertyCard {...item} key={i}/>

    })
  }
    </TabPane>
    <TabPane tab="Agent"  key="agent">
    {
    loading ? <SpinLoading/> : filterActive ? filterProperty.map((item, i)=>{


      return filterProperty.length > 0 ? <PropertyCard {...item} key={i}/> : <h5 className="my-10">No Property Availaible !</h5>

    }) :   property.map((item, i)=>{


      return <PropertyCard {...item} key={i}/>

    })
  }
    </TabPane>

  </Tabs>
 </Col>

 <Col span={6} >
 
 <h1>Filtering</h1>


<br/>

<SearchSelect tabtitle={tabkey} filter="furnished_status"/>

<br/><br/>

<SearchSelect tabtitle={tabkey} filter="bath_room"/>

<br/><br/>

<h4 className="my-5 ml-2">Filter By Price &nbsp; <Switch size="small"  onChange={(checked)=>activeFilter(checked, 'price') } /></h4>


<Slider
disabled={filterActive? false : true}
      range
      step={10}
      marks ={
        {5: '5L',
        20:'20L',
         40:'40L',
         60:'60L',
         80:'80L',
         100:'1C',
       
       
        }

      }
     
      defaultValue={[5, 20]}
      
      onAfterChange={(value)=>onAfterChange(value, 'total_price')}
    /> 

<br/><br/>

<h4>Filter By BedRoom</h4>
<Slider
   
   step={1}
      min={1}
      max={10}
    defaultValue={2}
    disabled
      onAfterChange={(value)=>  dispatch(fethFilterWithBetween('bath_room', value))}
      marks ={
        {2: '2',
         4:'4',
         6:'6',
         8:'8',
         10:'10',
         12:'12',
       
       
        }}

    />


 
 </Col>
        </Row>
    )
}

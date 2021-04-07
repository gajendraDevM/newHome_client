import React, {useState, useEffect} from 'react'
import {Table, Space} from 'antd'
import {FaRegEdit,  FaRegTrashAlt, FaTrashAlt} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'


import {Link} from 'react-router-dom'
import { deleteproperty, deleteManyproperty} from '../../../api/PropertySlice'
import {useDispatch} from 'react-redux'
// import moment from 'moment'
import DeleteConfirm from '../../shared/deleteConfirm'
import ExcelBtn from '../../shared/exportExcel'
import Search from '../../shared/search'
import styled from 'styled-components'
import { motion } from "framer-motion";

export default function Datatable({data}) {

console.log(data);
    const dispatch = useDispatch()
    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectionKey, setSelectionKey] = useState([]);



    const confirm = (e, id) => {
        dispatch(deleteproperty(id._id))
       
      }
      
      const cancel = (e) =>{
        return null
      }



    const columns = [
        {
          title: 'Name',
          dataIndex: 'project_name',
          key: 'project_name',
          sorter: (a, b) => a.property_name.length - b.property_name.length,
          sortDirections: ['descend', 'ascend'],
        },  {
          title: 'Type',
          dataIndex: 'property_type',
          render:(text)=>{
 return <h6>{text.property_type_info}</h6>

          },
          key: 'property_type',
        
        },
        {
          title: 'Mobile Number',
          dataIndex: 'owner_info',
          key: 'owner_info',
          render:(data)=>{

            return <h6>{data.phone_number}</h6>
          }
        },{
          title: 'Budjet',
          dataIndex: 'property_info',
          key: 'email',
          render:(data)=>{

            return <h6>{data.project_price} {data.price_unit}</h6>
          }
        },
        {
          title: 'email',
          dataIndex: 'owner_info',
          key: 'email',
          render:(data)=>{

            return <h6>{data.email}</h6>
          }
        }, {
          title: 'Owner Name',
          dataIndex: 'owner_info',
          key: 'contact_by',
          render:(data)=>{
console.log(data);
            return <h6>{data.contact_by}</h6>
          }
        },
        {
            title: 'Location',
            dataIndex: 'owner_info',
            key: 'owner_info',
            render:(data)=>{

              return <h6>{data.owner_locality}</h6>
            }
          },
  
          {
            title: 'Action',
            key: 'action',
            render: (id) => {
  
  
            return  <Space size="middle" align="center">
                
                <h5 className="text-dark">
                 <Link to={`/dashboard/property/${id._id}`}>
                  <FaRegEdit/> 
                   </Link> 
                  
                  
                  </h5>
              <h5>
                  <DeleteConfirm confirm={(e)=>confirm(e, id)} title="property" cancel={cancel} >
                      <FaRegTrashAlt   style={{cursor:"pointer", color:"red"}} />
                  </DeleteConfirm>
              </h5>
  
              </Space>
          },
          },
      ];


      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {


          setSelectionKey(selectedRowKeys)
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };

      const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "3.5rem" },
      }

    return (
        <DataTableWrap>
          <div className=" flex justify-between">
            <Search title="client"/>
            <ExcelBtn dataSource={data} columns={columns}/>
        </div>

        <motion.div
          animate={selectionKey.length>0 ? "open" : "closed"}
          variants={variants}
          // transition={{ duration: 0.2 }}
        id="deleteItems" className="flex  justify-between px-4 multidelete items-center ">

          <div className="flex justify-around" style={{color:"rgb(17 99 73)"}}>
            <AiOutlineClose onClick={()=>setSelectionKey([])} className="mt-1 cursor-pointer"/>
            &nbsp; &nbsp;{selectionKey.length}  selected</div>

          <div className="flex justify-around " style={{color:"#f44336"}}>
            <FaTrashAlt onClick={()=>dispatch(deleteManyproperty(selectionKey))} className="mt-1 cursor-pointer"/>  &nbsp; delete</div>
        </motion.div>
         
            <Table 
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}         
      
      rowKey={record=>record._id}
             dataSource={data} 
             columns={columns} />
        </DataTableWrap>
    )
}


const DataTableWrap = styled.div`

position:relative;
.multidelete{

  position:absolute;
  top:0%;
  left:0%;
  transform:translate(-50%, -50%);
  width:100%;
  height:3.5rem;
 background-color:#d8f1e9;
font-size:1rem;

}



`
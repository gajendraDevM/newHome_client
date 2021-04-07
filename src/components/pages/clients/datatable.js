import React, {useState, useEffect} from 'react'
import {Table, Space} from 'antd'
import {FaRegEdit,  FaRegTrashAlt, FaTrashAlt} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'


import {Link} from 'react-router-dom'
import { deleteClient, deleteManyClient} from '../../../api/clientSlice'
import {useDispatch} from 'react-redux'
// import moment from 'moment'
import DeleteConfirm from '../../shared/deleteConfirm'
import ExcelBtn from '../../shared/exportExcel'
import Search from '../../shared/search'
import styled from 'styled-components'
import { motion } from "framer-motion";

export default function Datatable({data}) {


    const dispatch = useDispatch()
    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectionKey, setSelectionKey] = useState([]);



    const confirm = (e, id) => {
        dispatch(deleteClient(id._id))
       
      }
      
      const cancel = (e) =>{
        return null
      }



    const columns = [
      
      {
        title: 'Customer Id',
        dataIndex: 'client_id',
        key: 'client_id',
      },
        {
          title: 'Name',
          dataIndex: 'client_name',
          key: 'client_name',
          sorter: (a, b) => a.client_name.length - b.client_name.length,
          sortDirections: ['descend', 'ascend'],
        },
        
        {
          title: 'phone Number',
          dataIndex: 'phone_number',
          key: 'phone_number',
        },
        {
          title: 'email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Requirement',
            dataIndex: 'client_requirement',
            key: 'client_requirement',
          },
          {
            title: 'Budget',
            dataIndex: 'bugjet_info',
            render:(budjet =>{
          return   <p className="mb-0">{budjet.bugjet_price}</p>
            }),
            key: 'client_requirement',
          }, 
        {
            title: 'customer_type',
            dataIndex: 'customer_type',
            key: 'customer_type',
          },
          
        {
            title: 'Location ',
            dataIndex: 'location',
            render:(loc =>{
     
          return   <p className="mb-0">{loc.locality}</p>
            }),
            key: 'customer_type',
          },
          {
            title: 'Furnished',
            dataIndex: 'isfurnished',
            filters: [
              {
                text: 'Furnished ',
                value: true,
              },
              {
                text: 'Unfurnished',
                value: false,
              }
            ],


            onFilter: (value, record) => {

            return  record.isFurnist === value
            },
           render:(record)=>{

            return  <p className="mb-0" style={{color:record?"green" : "blue"}}>{record? "Furnished" : "Unfurnished"}</p>

           }
          },
          {
            title: 'Action',
            key: 'action',
            render: (id) => {
  
  
            return  <Space size="middle" align="center">
                
                <h5 className="text-dark">
                 <Link to={`/dashboard/client/${id._id}`}>
                  <FaRegEdit/> 
                   </Link> 
                  
                  
                  </h5>
              <h5>
                  <DeleteConfirm confirm={(e)=>confirm(e, id)} title="blog" cancel={cancel} >
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
            <FaTrashAlt onClick={()=>dispatch(deleteManyClient(selectionKey))} className="mt-1 cursor-pointer"/>  &nbsp; delete</div>
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
 background-color:#fff1f1;
font-size:1rem;

}



`
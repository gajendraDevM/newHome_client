import React, {useState, useEffect} from 'react'
import {Table, Space, Button} from 'antd'
import {FaRegEdit,  FaRegTrashAlt, FaTrashAlt} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'

import {Link} from 'react-router-dom'
import { deleteEmployee, deleteManyEmployee} from '../../../api/empSlice'
import {useDispatch} from 'react-redux'
import moment from 'moment'
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
        dispatch(deleteEmployee(id._id))
       
      }
      
      const cancel = (e) =>{
        return null
      }



    const columns = [
        {
          title: 'client Name',
          dataIndex: 'employee_name',
          key: 'employee_name',
          sorter: (a, b) => a.employee_name.length - b.employee_name.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'employee_id',
          dataIndex: 'employee_id',
          key: 'employee_id',
        },
        {
          title: 'email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'designation',
            dataIndex: 'designation',
            key: 'designation',
          },
          {
            title: 'Action',
            key: 'action',
            render: (id) => {
  
  
            return  <Space size="middle" align="center">
                
                <h5 className="text-dark">
                 <Link to={`/dashboard/employee/${id._id}`}>
                  <FaRegEdit/> 
                   </Link> 
                  
                  
                  </h5>
              <h5>
                  <DeleteConfirm confirm={(e)=>confirm(e, id)} title="employee" cancel={cancel} >
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
            <Search title="employee"/>
            <div className=" flex justify-between ">
           <Button type="ghost" className="mr-3"><Link to="/dashboard/create-salary">Add Sallary</Link></Button>
            <ExcelBtn dataSource={data} columns={columns}/>
            </div>
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
            <FaTrashAlt onClick={()=>dispatch(deleteManyEmployee(selectionKey))} className="mt-1 cursor-pointer"/>  &nbsp; delete</div>
        </motion.div>
         
            <Table 
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}         
      
      rowKey={record=>record._id}
             dataSource={data} 
             expandedRowRender={(record)=>{

return<div className="insidetable">
  <h1 className="text-lg">{record.employee_name} Sallary Details</h1>
  <table  style={{width:"50%"}}>
      <tr className=" ">
        <th>salary Ammount</th>
        <th>date</th>
      </tr>
     
        {
          record.salary_info.map((item, i)=>{

            return  <tr key={i}> <td>₹{item.sallary_ammount}/-</td>
            <td> {moment(item.date).format('MMMM Do YYYY')  }</td></tr>
          })
        }
    

  
  </table>
  </div> 

             }}

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
.insidetable {
  padding:1rem 0;
table{
 border-spacing: 0 !important;
  
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: #fff;
}

}
 

}


`
import React from 'react'
import {Table, Space} from 'antd'
import {FaRegEdit, FaRegTrashAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { deleteClient} from '../../../api/clientSlice'
import {useDispatch} from 'react-redux'
import moment from 'moment'
import DeleteConfirm from '../../shared/deleteConfirm'
export default function Datatable({data}) {


    const dispatch = useDispatch()

    
    const confirm = (e, id) => {
        dispatch(deleteClient(id._id))
       
      }
      
      const cancel = (e) =>{
        return null
      }


    const columns = [
        {
          title: 'client Name',
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
            title: 'customer_type',
            dataIndex: 'customer_type',
            key: 'customer_type',
          },
          {
            title: 'Furnist',
            dataIndex: 'isFurnist',
            filters: [
              {
                text: 'furnist',
                value: true,
              },
              {
                text: 'non-furnist',
                value: false,
              }
            ],


            onFilter: (value, record) => {

            return  record.isFurnist === value
            },
           render:(record)=>{

            return  <p className="mb-0" style={{color:record?"green" : "blue"}}>{record? "Furnist" : "Non-Furnist"}</p>

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


    return (
        <div>
            <Table rowKey={record=>record._id} dataSource={data} columns={columns} />
        </div>
    )
}

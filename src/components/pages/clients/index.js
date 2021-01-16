import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchAllClients, clientSelector} from '../../../api/clientSlice'
import {authenticateSelector} from '../../../api/authSlice'

import Loader from '../../shared/spin'
import DataTable from './datatable'
import Search from '../../shared/search'
export default function Client() {

    const dispatch = useDispatch()
    const {loading, client} = useSelector(clientSelector)
    const {current} = useSelector(authenticateSelector)

useEffect(()=>{

dispatch(fetchAllClients())


}, [dispatch])
console.log(current);
    return (
        <div>
            <div className="mb-4 ">
            <Search title="client"/>
</div>
          {
              loading? <Loader/> : <DataTable data={(current.length> 0) ? current : client}/>
          }
        </div>
    )
}
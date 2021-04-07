import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchAllClients, clientSelector} from '../../../api/clientSlice'
import {authenticateSelector} from '../../../api/authSlice'

import Loader from '../../shared/spin'
import DataTable from './datatable'
export default function Client() {

    const dispatch = useDispatch()
    const {loading, client} = useSelector(clientSelector)
    const {current} = useSelector(authenticateSelector)

useEffect(()=>{

dispatch(fetchAllClients())


}, [dispatch])

    return (
        <div>
            
          {
              loading? <Loader/> : <DataTable data={(current.length> 0) ? current : client}/>
          }
        </div>
    )
}

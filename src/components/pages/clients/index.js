import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchAllEmployees, employeeSelector} from '../../../api/empSlice'
import {authenticateSelector} from '../../../api/authSlice'

import Loader from '../../shared/spin'
import DataTable from './datatable'
export default function Client() {

    const dispatch = useDispatch()
    const {loading, employee} = useSelector(employeeSelector)
    const {current} = useSelector(authenticateSelector)

useEffect(()=>{

dispatch(fetchAllEmployees())


}, [dispatch])
console.log(current);
    return (
        <div>
            
          {
              loading? <Loader/> : <DataTable data={(current.length> 0) ? current : employee}/>
          }
        </div>
    )
}

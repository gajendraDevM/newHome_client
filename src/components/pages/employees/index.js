import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllEmployees, employeeSelector} from '../../../api/empSlice'
import Loader from '../../shared/spin'
import DataTable from './datatable'
import {authenticateSelector} from '../../../api/authSlice'

export default function Employee() {

    const dispatch = useDispatch()
    const {loading, employee} = useSelector(employeeSelector)
    const {current} = useSelector(authenticateSelector)

useEffect(()=>{

dispatch(fetchAllEmployees())


}, [dispatch])
console.log(employee);
    return (
        <div>
          {
              loading? <Loader/> : <DataTable data={(current.length> 0) ? current : employee}/>
          }
        </div>
    )
}

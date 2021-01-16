import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchAllemployees, employeeSelector} from '../../../api/employeeSlice'
import Loader from '../../shared/spin'
import DataTable from './datatable'
export default function Employee() {

    const dispatch = useDispatch()
    const {loading, employee} = useSelector(employeeSelector)

useEffect(()=>{

dispatch(fetchAllemployees())


}, [dispatch])

    return (
        <div>
          {
              loading? <Loader/> : <DataTable data={employee}/>
          }
        </div>
    )
}

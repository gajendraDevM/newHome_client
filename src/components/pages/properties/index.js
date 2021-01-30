import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchAllpropertys, propertySelector} from '../../../api/PropertySlice'
import {authenticateSelector} from '../../../api/authSlice'

import Loader from '../../shared/spin'
import DataTable from './datatable'
export default function Property() {

    const dispatch = useDispatch()
    const {loading, property} = useSelector(propertySelector)
    const {current} = useSelector(authenticateSelector)

useEffect(()=>{

dispatch(fetchAllpropertys())


}, [dispatch])


console.log(property);


    return (
        <div>
            
          {
              loading? <Loader/> : <DataTable data={(current.length> 0) ? current : property}/>
          }
        </div>
    )
}

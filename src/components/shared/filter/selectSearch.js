import React from 'react'
import { Select } from 'antd';
import {fetchFilter, propertySelector} from '../../../api/PropertySlice'
import {useDispatch, useSelector} from 'react-redux'
const { Option } = Select;
export default function SelectSearch({filter, key}) {


const dispatch = useDispatch()
const {property} = useSelector(propertySelector)
    function onChange(value) {

    dispatch(fetchFilter(filter, value, key))
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearchSelect(val) {
        console.log('search:', val);
      }


    return (
        <div>
             <Select
    showSearch
    style={{ width: 200 }}
    placeholder={filter}
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearchSelect}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
   
{

filter === 'furnished_status' && <>
   <Option  value="furnished">furnished</Option>
   <Option  value="semi-furnished">semi-furnished</Option>
   <Option  value="unfurnished">un-furnished</Option>
</>
}

{

filter === 'bath_room' && <>
   <Option  value={1}>1</Option>
   <Option  value={2}>2</Option>
   <Option  value={3}>3</Option>
   <Option  value={4}>4</Option>
   <Option  value={5}>5</Option>
   <Option  value={6}>6</Option>
   <Option  value={7}>7+</Option>

</>
}

    
  
  </Select>
        </div>
    )
}

import React from 'react'
import { Menu, Dropdown, Button } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import {logOut} from '../../api/authSlice'
import {useDispatch} from 'react-redux'

export default function DropdownSec({username, userIcon, icon, history}) {

const dispatch = useDispatch()



    const menu = (
        <Menu>



<Menu.Item >
            <Button type="text"  icon={icon}>
          welcome  {username}
            </Button>
          </Menu.Item>

     <Menu.Item >
            <Button type="link" danger onClick={()=>dispatch(logOut())}  icon={userIcon}>
           Logout
            </Button>
          </Menu.Item>
          
         
        </Menu>
      );



    return (
        <Dropdown overlay={menu}>
        <Button type="primary"  shape="circle" onClick={e => e.preventDefault()}>
       {icon} 
        </Button>
      </Dropdown>
    )
}

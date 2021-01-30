import React from 'react'
import styled from 'styled-components'
import { Layout, Menu, Switch } from 'antd';
import {Link, useLocation} from 'react-router-dom'
import {authenticateSelector} from '../../api/authSlice'
import {useSelector} from 'react-redux'
import {
  ShopOutlined,
  QuestionCircleFilled,
  SettingFilled,
    AppstoreFilled,
    UserOutlined ,
    UsergroupAddOutlined
  } from '@ant-design/icons';

const {SubMenu} = Menu

const {  Sider } = Layout;

export default function Sidemenu({click, color, collapsed }) {

const {pathname} = useLocation()




    return (
   <SideMenuWrap color={color}>
             <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="py-sm-5 py-2">

{/* <img className="mx-auto d-block" src={color?darklogo: whitelogo} alt="alt" width="170px"/> */}
            </div>



          <Menu
           theme={color? 'dark' : 'light'}
           mode="inline"
           defaultSelectedKeys={[pathname]}
           className="menu"
          >
           
          <Menu.Item key="/dashboard" icon={<AppstoreFilled />} >
           <Link to="/dashboard">Dashboard</Link> 
            </Menu.Item>

     <SubMenu  key="/dashboard/clients" icon={<UsergroupAddOutlined />} title="Client">
 
        <Menu.Item key="/dashboard/clients"  >
         <Link to="/dashboard/clients">Client List</Link> </Menu.Item>
        <Menu.Item key="/dashboard/create-client" >
        <Link to="/dashboard/create-client">Create Client</Link> 
          </Menu.Item>

        </SubMenu>


        
     <SubMenu  key="/dashboard/employee" icon={<UserOutlined />} title="Employee">
 
 <Menu.Item key="/dashboard/employee"  >
  <Link to="/dashboard/employee">Employee List</Link> </Menu.Item>
 <Menu.Item key="/dashboard/create-employee" >
 <Link to="/dashboard/create-employee">Create Employee</Link> 
   </Menu.Item>

 </SubMenu>


 <SubMenu  key="/dashboard/property" icon={<ShopOutlined />} title="Property">
 
 <Menu.Item key="/dashboard/property"  >
  <Link to="/dashboard/property">property List</Link>
  
   </Menu.Item>

 <Menu.Item key="/dashboard/create-property" >
 <Link to="/dashboard/create-property">Create property</Link> 
   </Menu.Item>

   <Menu.Item key="/dashboard/property-tab" >
 <Link to="/dashboard/property-tab">Filter Tab</Link> 
   </Menu.Item>

 </SubMenu>

 <SubMenu  key="/dashboard/setting" icon={<SettingFilled />} title="Setting">
 
 <Menu.Item key="/dashboard/admin-setting"  >
  <Link to="/dashboard/admin-setting">Admin Profile</Link>
  
   </Menu.Item>

 <Menu.Item key="/dashboard/intial-setting" >
 <Link to="/dashboard/intial-setting">Intial Setting</Link> 
   </Menu.Item>


 </SubMenu>


        
         

          </Menu>
          <div className="mode">
         <Switch checkedChildren="Dark" unCheckedChildren="Light" onChange={()=>click()} />
          </div>
        </Sider>
        </SideMenuWrap>
      
    )
}


const SideMenuWrap = styled.div`



.menu{


font-size:1rem;
svg{

  font-size:1.1rem;
  transform:translate(-5px, -2px);
}

}

/* .ant-menu-item .ant-menu-item-selected span.anticon.anticon-snippets  svg {
  color: white !important;
} */

.mode{

position:absolute;
bottom:5%;
left:10%;

.ant-switch{

  background-color:${props=>props.color? "grey":"var(--brandColor)"};
}
}


`

    {/* <SubMenu  key="sub1" icon={<UserOutlined/>} title="Vouchers">
 
           <Menu.Item key="2" >All vouchers</Menu.Item>
           <Menu.Item key="3" >Add new voucher</Menu.Item>

         </SubMenu> */}

    
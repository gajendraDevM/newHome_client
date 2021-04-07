import React, {useEffect, useState} from 'react'
import { MenuUnfoldOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout,  Badge} from 'antd';
import styled from 'styled-components'
import {MdNotifications} from 'react-icons/md'
import {UserOutlined  } from '@ant-design/icons';
import Dropdown from '../shared/dropdown'
import {authenticateSelector} from '../../api/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
const { Header } = Layout;

export default function HeaderMenu({collapsed, click}) {

const dispatch = useDispatch()

// useEffect(()=>{

//   dispatch(fetchAllQtn())

// }, [dispatch])


// const {totalUnAnsweredQtn} = useSelector(qtnSelector)
// const {user} = useSelector(authenticateSelector)




    return (
         <HeaderMenuWrap>
        <Header className="site-layout-background shadow-sm" style={{ padding: 0 }}>
        <div className="d-flex flex-end"> 

      {collapsed ?
         <MenuUnfoldOutlined className="trigger" onClick={()=>click()}/>
          :<MenuFoldOutlined className="trigger" onClick={()=>click()}/>}  


 {/* <div className="n">
<Badge size="small" className="notification" count={ totalUnAnsweredQtn}>
   <Link to="/admin/experts" style={{color:"grey"}}><MdNotifications style={{cursor:"pointer"}}/></Link> 
  </Badge>
<span className="mx-3 my-auto">
  <Dropdown 
  username={user.curentUser.name}
  userIcon={<LogoutOutlined style={{fontSize:"1.2rem", transform:"translateY(-3px)", fontWeight:"bold"}}/>}
  icon={< UserOutlined style={{fontSize:"1.2rem", transform:"translateY(-3px)", fontWeight:"bold"}}/>}/> 
    </span>
</div> */}
</div>

      
           
          </Header>

     

         </HeaderMenuWrap>
    )
}

const HeaderMenuWrap = styled.div`
.n{

  display:flex;
  justify-content:flex-end;
  line-height:64px;

  width:100%;

  button{

    margin: auto;
  }
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover{

      color: var(--brandColor); 
  }
}


.ant-badge-count{

top:25px;
}



#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover{

color: var(--brandColor); 
}
  /* &:hover{

      color: #1890ff;
  } */
}


.notification{

  font-size:1.7rem;
  line-height: 64px;

}


`

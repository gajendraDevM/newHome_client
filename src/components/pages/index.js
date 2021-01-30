import React, {useState, useEffect} from 'react'
import { Layout } from 'antd';
import styled from 'styled-components'
import SideBar from './sidebar'
import Header from './header'
import {  Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Home from '../pages/clients'
import CreateClient from '../pages/clients/createclient'
import Client from '../pages/clients'
import ClientUpdate from '../pages/clients/editClient'



import {useDispatch, useSelector} from 'react-redux'
import {authenticateSelector} from '../../api/authSlice'
import CreateEmployee from './employees/createEmployee';
import Employee from './employees';


import Property from './properties/createProperty';
import PropertyList from './properties';
import Propertytab from './properties/propertytab';




const {  Content } = Layout;


export default function Admin({history, location}) {

  let { path } = useRouteMatch();
// let {history} = useHistory()
    const [collapsed, setCollapsed] = useState(false)
    const [theme, setTheme] = useState(true)


const dispatch = useDispatch()
  const {isAuthenticate} = useSelector(authenticateSelector)
  
useEffect(()=>{

if (!isAuthenticate) {
  history.push('/');
}
else{

  history.push(location.pathname);
}
  
}, [dispatch, isAuthenticate, history ])

    const  toggle = () => {

        setCollapsed(!collapsed)

      
      };

      const changeTheme = () =>{

        setTheme(!theme)
    
    }

    return (
        <AdminWrap color={theme}>
        <Layout>
     
     <SideBar collapsed={collapsed} color={theme}  click={changeTheme}/>
     

        <Layout className="site-layout">
        
        <Header click={toggle} collapsed={collapsed}/>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
        
        <Switch>

<Route  exact path={`${path}/`}  component={Home} />
<Route  exact path={`${path}/create-client`}  component={CreateClient} />
<Route  exact path={`${path}/clients`}  component={Client} />
<Route  exact path={`${path}/client/:id`}  component={ClientUpdate} />

<Route  exact path={`${path}/create-employee`}  component={CreateEmployee} />
<Route  exact path={`${path}/employee`}  component={Employee} />

<Route  exact path={`${path}/property`}  component={PropertyList} />
<Route  exact path={`${path}/create-property`}  component={Property} />
<Route  exact path={`${path}/property-tab`}  component={Propertytab} />
<Route  exact path={`${path}/intial-setting`}  component={Propertytab} />
<Route  exact path={`${path}/admin-setting`}  component={Propertytab} />


</Switch>
          </Content>
        </Layout>
      </Layout>

 
      </AdminWrap>
    )
}


const AdminWrap = styled.div`


.ant-layout {

.ant-layout-sider{
    height: 100vh;
    overflow-y: auto;

    background:${props => props.color ? "#001529" : "#ffffff"};
}
}



.logo {
height: 32px;
background: rgba(255, 255, 255, 0.2);
margin: 16px;
}



#components-layout-demo-custom-trigger .logo {
height: 32px;
background: rgba(255, 255, 255, 0.2);
margin: 16px;
}

.site-layout .site-layout-background {
background: #fff;
}

`
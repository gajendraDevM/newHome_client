import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Home from './components/Clientview/home'
import Dashboard from './components/pages'
// import { useSelector } from 'react-redux'
// import {layoutSelector} from './components/Api/layoutSlice'
import Login from './components/auth/login'
import PrivateRoute from './components/auth/privateRoute'
import './App.less';

function App() {

  return (
    <Router>
    <main className="App" className=" font-text">
<PrivateRoute path="/dashboard" component={Dashboard} />
 <Route path="/" component={Login} exact/> 
  {/* <Route path="/dashboard" component={Dashboard} exact/>  */}

    </main>
  
    </Router> 
  
  );
}

export default App;

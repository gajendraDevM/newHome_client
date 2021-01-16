import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import {authenticateSelector} from '../../api/authSlice'
import {useSelector} from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {

const {loading, isAuthenticate} = useSelector(authenticateSelector)
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticate && !loading  ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;

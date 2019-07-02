import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { ACCESS_TOKEN } from "../constants";
const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  let token = localStorage.getItem(ACCESS_TOKEN)
  var isLoggedIn = false;
  if(token !== null && token !== "" && token !== undefined){
    isLoggedIn = true;
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute

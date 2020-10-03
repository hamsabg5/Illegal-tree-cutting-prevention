import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, componentProps, ...rest }) => {
  const isAuthenticated = JSON.parse(sessionStorage.getItem("isAuthenticated"));

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...{ ...props, ...componentProps }} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export default ProtectedRoute;

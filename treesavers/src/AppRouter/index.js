import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PATHS from "./paths.json";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./ScrollToTop";
import AuthScreen from "Pages/AdminLoginScreen/index.js";
import DashBoard from "Pages/DashBoard.js";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <ProtectedRoute path={PATHS.dashboard} component={DashBoard} />
        <Route path="/" children={<AuthScreen />} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;

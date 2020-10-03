import React from "react";
import "./App.css";
import { GlobalDataProvider } from "Store";
import AppRouter from "AppRouter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Call it once in your app. At the root of your app is the best place
toast.configure();

const App = () => {
  return (
    <GlobalDataProvider>
      <AppRouter />
    </GlobalDataProvider>
  );
};

export default App;

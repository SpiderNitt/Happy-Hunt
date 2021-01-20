import React from "react";
import "./App.css";

import AppNavigation from "./navigation/userNavigation";
import { AuthProvider } from "./api/authContext";
import { BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <UserNav />
      </div>
    </AuthProvider>
  );
}

export default App;

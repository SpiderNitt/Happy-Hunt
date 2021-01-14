import React from "react";
import "./App.css";

import AppNavigation from "./navigation/UserNavigation";
import { AuthProvider } from "./api/authContext";
import { BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <AppNavigation />
          </Switch>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
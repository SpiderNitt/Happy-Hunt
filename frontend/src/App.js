import React from "react";
import "./App.css";

import AppNavigation from "./navigation/UserNavigation";
import { AuthProvider } from "./api/authContext";
import { BrowserRouter, Switch } from "react-router-dom";
import Socketio from "./utils/socketio";

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Socketio />
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

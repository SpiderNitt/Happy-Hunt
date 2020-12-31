import React from "react";
import "./App.css";
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
//import UserNav from "./navigation/UserNavigation";

function App() {
  return (

    <div className='App'>
        <Navbar/>
        <Welcome/>
    </div>
    
  )

}

export default App;

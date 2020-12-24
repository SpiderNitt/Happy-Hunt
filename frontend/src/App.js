import React from "react";
import "./App.css";
import Navbar from './components/Navbar';
import Starting from './components/Starting';
import Welcome from './components/Welcome';
import Rules from './components/Rules';
import MainClues from './components/MainClues';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Stats from "./components/Stats";
import Leaderboard from "./components/Leaderbaord";
import Notifications from "./components/Notifications";

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/starting" component={Starting}/>
          <Route path="/rules" component={Rules}/>
          <Route path="/main" component={MainClues}/>
          <Route path="/stats" exact component={Stats}/>
          <Route path="/leaderboard" component={Leaderboard}/>
          <Route path="/notifications" component={Notifications}/>
        </Switch>
        </div>
    </Router>
    
  )
}

export default App;

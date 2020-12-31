import React from "react";
import Welcome from '../components/Welcome';
import MainClues from '../components/MainClues';
import Activity from "../components/Activity";
import Leaderboard from "../components/Leaderbaord";
import Notifications from "../components/Notifications";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from '../components/Navbar';

function UserNav() {

  return (
    
    <Router>
      <div>
      <Navbar/>
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/main" component={MainClues}/>
          <Route path="/activity" exact component={Activity}/>
          <Route path="/leaderboard" component={Leaderboard}/>
          <Route path="/notifications" component={Notifications}/>  
        </Switch>
        </div>
    </Router>
    
  )

}

export default UserNav;

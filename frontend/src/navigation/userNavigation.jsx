import React from "react";
import Welcome from '../components/Welcome';
import MainClues from '../components/MainClues';
import Activity from "../components/Activity";
import Leaderboard from "../components/Leaderbaord";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ButtonAppBar from '../components/Navbar';
import PictureClues from '../components/PictureClues';

function UserNav() {

  return (
    
    <Router>
      <div>
      <ButtonAppBar/>
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/main" component={MainClues}/>
          <Route path="/activity" component={Activity}/>
          <Route path="/leaderboard" component={Leaderboard}/>
          <Route path="/pictureclues" component={PictureClues}/>
        </Switch>
        </div>
    </Router>
    
  )

}

export default UserNav;

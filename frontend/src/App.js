import React from "react";
import "./App.css";
import Navbar from "./user/Navbar";
import Starting from "./user/Starting";
import Welcome from "./user/Welcome";
import Rules from "./user/Rules";
import MainClues from "./user/MainClues";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Activity from "./user/Activity";
import Leaderboard from "./user/Leaderbaord";
import Notifications from "./user/Notifications";

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Welcome} />
          <Route path='/starting' component={Starting} />
          <Route path='/rules' component={Rules} />
          <Route path='/main' component={MainClues} />
          <Route path='/activity' exact component={Activity} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/notifications' component={Notifications} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

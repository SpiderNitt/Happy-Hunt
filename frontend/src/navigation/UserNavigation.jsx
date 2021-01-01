import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "../user/Home";
import UserRegistration from "../user/UserRegistration";
import TopNav from "../user/TopNav";
import NavBar from "../user/NavBar";
import { Container } from "@material-ui/core";
import Clues from "../user/Clues";
import ActivityFeed from "../user/ActivityFeed";
import Leaderboard from "../user/Leaderbaord";
import Notifications from "../user/Notifications";
import GameIntro from "../user/GameIntro";
import CreateTeam from "../user/CreateTeam";

function UserNav() {

  return (

    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/register" component={UserRegistration}/>
          <Route path="/register-team" component={CreateTeam}/>
          <Route path="/happy-hunt" exact>
            <TopNav />
            <Container style={{ marginTop: 70 }}>
              <GameIntro />
            </Container>
          </Route>
          <Route path="/activity" exact>
            <TopNav />
            <div style={{ marginTop: 70 }}><NavBar select="activity" /></div>
            <Container>
              <ActivityFeed />
            </Container>
          </Route>
          <Route path="/clue" exact>
            <TopNav />
            <div style={{ marginTop: 70 }}><NavBar select="clue" /></div>
            <div style={{ marginTop: 20 }}>
              <Clues />
            </div>
          </Route>
          <Route path="/scoreboard" exact>
            <TopNav />
            <div style={{ marginTop: 70 }}><NavBar select="scoreboard" /></div>
            <Container>
              <Leaderboard />
            </Container>
          </Route>
          <Route path="/notification" exact>
            <TopNav />
            <div style={{ marginTop: 70 }}><NavBar select="notification" /></div>
            <Container>
              <Notifications />
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>

  )

}

export default UserNav;
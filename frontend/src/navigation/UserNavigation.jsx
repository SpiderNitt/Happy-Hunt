import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
import PictureClues from '../user/PictureClues';
import TextClues from '../user/TextClues';
import LocationClues from '../user/LocationClues';
import Capture from '../user/Photogragh';

import VerificationEmail from "../user/VerificationEmail";
import UserLogin from "../UserLogin";
import ClueTabs from "../user/ClueTabs";
import Routes from "../utils/routes";
import ProfilePage from "../user/ProfilePage";


function UserNav() {

    return (
    <Router>
      <div>
        <Switch>
          <Route path={Routes.WELCOME} exact component={GameIntro}/>
          <Route path={Routes.HOME} exact component={Home}/>
          <Route path={Routes.USER_REGISTER} component={UserRegistration}/>
          <Route path={Routes.USER_LOGIN} component={UserLogin}/>
          <Route path="/verify" component={VerificationEmail}/>
          <Route path="/register-team" component={CreateTeam}/>
          <Route path="/photo-clue" component={PictureClues}/>
          <Route path="/photo" exact component={Capture}/>
          <Route path="/location-clue" component={LocationClues}/>
          <Route path="/text-clue" component={TextClues}/>
          <Route path="/profile" exact>
            <TopNav />
            <div style={{ marginTop: 70 }}>
                <ProfilePage />
            </div>

          </Route>
          <Route path="/happy-hunt" exact>
              <TopNav />
              <Container style={{ marginTop: 70 }}>
                  <GameIntro />
              </Container>
          </Route>
          <Route path={Routes.USER_ACTIVITY} exact>
              <TopNav />
              <div style={{ marginTop: 70 }}><NavBar select="activity" /></div>
              <Container>
                  <ActivityFeed />
              </Container>
          </Route>
          <Route path={Routes.USER_CLUES} exact>
              <TopNav />
              <div style={{ marginTop: 70 }}><NavBar select="clue" /></div>
              <ClueTabs />
              <div style={{ marginTop: 20 }}>
                  <Clues />
              </div>
          </Route>
          <Route path={Routes.USER_LEADERBOARD} exact>
              <TopNav />
              <div style={{ marginTop: 70 }}><NavBar select="scoreboard" /></div>
              <Container>
                  <Leaderboard />
              </Container>
          </Route>
          <Route path="/notification" exact>
              <TopNav />
              <div style={{ marginTop: 70 }}><NavBar select="notification" /></div>
              <Container style={{ marginTop: 10 }}>
                  <Notifications />
              </Container>
          </Route>
      </Switch>
      </div>
    </Router>
  )

}

export default UserNav;

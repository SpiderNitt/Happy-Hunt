import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from "../user/Home";
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
import ClueItems from '../user/ClueItems'

import ClueTabs from "../user/ClueTabs";
import Routes from "../utils/routes";
import ProfilePage from "../user/ProfilePage";
import JoinTeam from "../user/JoinTeam";
import AuthContext from "../api/authContext";
import { getToken } from "../api/storage";
import useScript from "../hooks/useScript";


function UserNav() {
  useScript(
    "https://embed.tawk.to/5ffc4538c31c9117cb6d70dc/1eromsq55",
    "user",
    {
      key: "crossorigin",
      value: "*"
    }
  );
    const authContext = useContext(AuthContext);
    console.log(authContext)
    return (
    <Router>
      <div className="user">
        <Switch>
          {getToken() ? (
        <>
          <Route path={Routes.USER_REGISTER_TEAM} component={CreateTeam}/>
          <Route path={Routes.USER_JOIN_TEAM} component={JoinTeam}/>
          <Route path="/photo-clue" component={PictureClues}/>
          <Route path="/photo" exact component={Capture}/>
          <Route path="/location-clue" component={LocationClues}/>
          <Route path="/text-clue" component={TextClues}/>
          <Route path={Routes.HOME} exact>
            <TopNav />
            <div style={{ marginTop: 70 }}>
                <Home />
            </div>
          </Route>
          <Route path={Routes.USER_PROFILE} exact>
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
                  <ClueItems />
                  <Clues/>
              </div>
          </Route>
          <Route path={Routes.USER_LEADERBOARD} exact>
              <TopNav />
              <div style={{ marginTop: 70 }}><NavBar select="scoreboard" /></div>
              <Container>
                  <Leaderboard />
              </Container>
          </Route>
          <Route path={Routes.USER_NOTIFICATION} exact>
              <TopNav />
              <Container style={{ marginTop: 70 }}>
                  <Notifications />
              </Container>
          </Route>
        </>
        ) : <Redirect to={Routes.WELCOME} />}
      </Switch>
      </div>
    </Router>
  )

}

export default UserNav;

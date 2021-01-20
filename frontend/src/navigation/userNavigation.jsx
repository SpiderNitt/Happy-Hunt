import React, { useContext } from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
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
import UserRegistration from "../user/UserRegistration";
import UserLogin from "../user/UserLogin";
import VerificationEmail from "../user/VerificationEmail";
import { AuthContext } from "../api/authContext";
import useScript from "../hooks/useScript";
import AdminNav from "./AdminNavigation";

const UserAuthenticatedRoute = ({ children, ...rest }) => {
  useScript(
    "https://embed.tawk.to/5ffc4538c31c9117cb6d70dc/1eromsq55",
    "user",
    {
      key: "crossorigin",
      value: "*",
    }
  );
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        authContext.isAuthenticated() ? (
          <>
          {children}
          <div className='user'></div>
          </>
        ) : (
          <Redirect to={Routes.WELCOME} />
        )
      }
    ></Route>
  );
};


function UserNav() {

  return (
    <>
    <Switch>
      <Route path={Routes.USER_REGISTER} component={UserRegistration}/>
      <Route path={Routes.USER_LOGIN} component={UserLogin}/>
      <Route path={Routes.USER_VERIFY} component={VerificationEmail}/>
      <Route path={Routes.WELCOME} exact component={GameIntro}/>
      <UserAuthenticatedRoute path={Routes.USER_REGISTER_TEAM} component={CreateTeam}/>
      <UserAuthenticatedRoute path={Routes.USER_JOIN_TEAM} component={JoinTeam}/>
      <Route path="/photo-clue" component={PictureClues}/>
      <Route path="/photo" exact component={Capture}/>
      <Route path="/location-clue" component={LocationClues}/>
      <Route path="/text-clue" component={TextClues}/>
      <UserAuthenticatedRoute path={Routes.HOME} exact>
        <TopNav />
        <div style={{ marginTop: 70 }}>
            <Home />
        </div>
      </UserAuthenticatedRoute>
      <UserAuthenticatedRoute path={Routes.USER_PROFILE} exact>
        <TopNav />
        <div style={{ marginTop: 70 }}>
            <ProfilePage />
        </div>
      </UserAuthenticatedRoute>
      <UserAuthenticatedRoute path={Routes.USER_ACTIVITY} exact>
          <TopNav />
          <div style={{ marginTop: 70 }}><NavBar select="activity" /></div>
          <Container>
              <ActivityFeed />
          </Container>
      </UserAuthenticatedRoute>
      <UserAuthenticatedRoute path={Routes.USER_CLUES} exact>
          <TopNav />
          <div style={{ marginTop: 70 }}><NavBar select="clue" /></div>
          <ClueTabs />
          <div style={{ marginTop: 20 }}>
              <Clues />
          </div>
      </UserAuthenticatedRoute>
      <UserAuthenticatedRoute path={Routes.USER_LEADERBOARD} exact>
          <TopNav />
          <div style={{ marginTop: 70 }}><NavBar select="scoreboard" /></div>
          <Container>
              <Leaderboard />
          </Container>
      </UserAuthenticatedRoute>
      <UserAuthenticatedRoute path={Routes.USER_NOTIFICATION} exact>
          <TopNav />
          <Container style={{ marginTop: 70 }}>
              <Notifications />
          </Container>
      </UserAuthenticatedRoute>
      <AdminNav />
    </Switch>
    </>
  )
}

export default UserNav;

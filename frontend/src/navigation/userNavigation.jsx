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

import ClueTabs from "../user/ClueTabs";
import Routes from "../utils/routes";
import ProfilePage from "../user/ProfilePage";
import JoinTeam from "../user/JoinTeam";
import UserRegistration from "../user/UserRegistration";
import UserLogin from "../user/UserLogin";
import VerificationEmail from "../user/VerificationEmail";
import { AuthContext } from "../api/authContext";
import AdminNav from "./AdminNavigation";
import MessageBot from "../components/MessageBot";

const UserAuthenticatedRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        authContext.isAuthenticated() ? (
          <>
          {children}
          <MessageBot />
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
      <Route path={Routes.USER_REGISTER} exact>
        <UserRegistration />
        <MessageBot />
      </Route>
      <Route path={Routes.USER_LOGIN} exact>
        <UserLogin />
        <MessageBot />
      </Route>
      <Route path={Routes.USER_VERIFY} exact render={(props) => (
        <>
        <VerificationEmail {...props} />
        <MessageBot />
        </>
      )} />
      <Route path={Routes.WELCOME} exact>
        <GameIntro />
        <MessageBot />
      </Route>
      <UserAuthenticatedRoute path={Routes.USER_REGISTER_TEAM} exact component={CreateTeam}/>
      <UserAuthenticatedRoute path={Routes.USER_JOIN_TEAM} exact component={JoinTeam}/>
      <Route path="/photo" exact component={Capture}/>
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
      <UserAuthenticatedRoute path={Routes.USER_PICTURE_CLUE} exact>
        <TopNav />
        <div style={{ marginTop: 70 }}>
            <PictureClues />
        </div>
      </UserAuthenticatedRoute>
      <UserAuthenticatedRoute path={Routes.USER_LOCATION_CLUE} exact>
        <TopNav />
        <div style={{ marginTop: 70 }}>
            <LocationClues />
        </div>
      </UserAuthenticatedRoute>
      <UserAuthenticatedRoute path={Routes.USER_TEXT_CLUE} exact>
        <TopNav />
        <div style={{ marginTop: 70 }}>
            <TextClues />
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
import React, { useContext } from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from "../user/Home";
import TopNav from "../user/TopNav";
import NavBar from "../user/NavBar";
import { Container } from "@material-ui/core";
import ActivityFeed from "../user/ActivityFeed";
import Leaderboard from "../user/Leaderbaord";
import Notifications from "../user/Notifications";
import GameIntro from "../user/GameIntro";
import CreateTeam from "../user/CreateTeam";
import PictureClues from '../user/PictureClues';
import TextClues from '../user/TextClues';
import LocationClues from '../user/LocationClues';
import Capture from '../user/Photogragh';
import Camera from '../user/Camera';
import ScoreNav from '../user/ScoreNav';
import Hints from "../user/Hints";
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
import PaymentPage from "../user/PaymentPage";
import Pricing from '../components/Pricing';
import ForgotPassword from "../user/ForgotPassword";
import PrivacyPolicy from "../static/PrivacyPolicy";
import TermsOfUse from "../static/TermsOfUse";
import AboutUs from "../static/AboutUs";
import RulesAndRegulations from "../static/RulesAndRegulations";
import UserAcceptReject from "../user/UserAcceptReject";

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
  const authContext = useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route path={Routes.PRIVACY_POLICY} exact component={PrivacyPolicy} />
        <Route path={Routes.TERMS_OF_USE} exact component={TermsOfUse} />
        <Route path={Routes.ABOUT_US} exact component={AboutUs} />
        <Route path={Routes.RULES} exact component={RulesAndRegulations} />
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
        <Route path={Routes.USER_FORGOTPASSWORD} exact render={(props) => (
          <>
            <ForgotPassword {...props} />
            <MessageBot />
          </>
        )} />
        <Route path={Routes.WELCOME} exact>
          <GameIntro />
          <MessageBot />
        </Route>
        <UserAuthenticatedRoute path={Routes.USER_REGISTER_TEAM} exact>
          <TopNav />
          <div style={{ marginTop: 70 }}>
            <CreateTeam />
          </div>
        </UserAuthenticatedRoute>
        <UserAuthenticatedRoute path={Routes.USER_JOIN_TEAM} exact>
          <TopNav />
          <div style={{ marginTop: 70 }}>
            <JoinTeam />
          </div>
        </UserAuthenticatedRoute>
        <Route path={Routes.USER_PAYMENT} exact>
            <Pricing />
        </Route>
        <Route path="/photo" exact component={Capture} />
        <UserAuthenticatedRoute path={Routes.HOME} exact>
          <TopNav />
          <div style={{ marginTop: 70 }}>
            <Home />
          </div>
        </UserAuthenticatedRoute>
        <UserAuthenticatedRoute path={Routes.USER_PROFILE} exact>
          <TopNav />
          <ScoreNav />
          <div style={{marginTop: 20 }}>
            <ProfilePage />
          </div>
        </UserAuthenticatedRoute>
        <UserAuthenticatedRoute path={Routes.USER_ACTIVITY} exact>
          <TopNav />
          <ScoreNav/>
          <div><NavBar select="activity" /></div>
          <Container>
            <ActivityFeed />
          </Container>
        </UserAuthenticatedRoute>
        <UserAuthenticatedRoute path={Routes.USER_CLUES} exact>
          <TopNav />
          <ScoreNav/>
          <div><NavBar select="clue" /></div>
          <ClueTabs />
        </UserAuthenticatedRoute>
        <Route
              path={Routes.USER_PICTURE_CLUE}
              exact
              render={(props) => (
              authContext.isAuthenticated() ? (
              <div style={{ marginTop: 70 }}>
                  <TopNav />
                  <ScoreNav/>
                  <PictureClues {...props} />
              </div>
             ) : (<Redirect to={Routes.WELCOME} />)
        )} /> 
        <Route
          path={Routes.USER_CAPTURE}
          exact
          render={(props) => (
          authContext.isAuthenticated() ? (
          <div style={{ marginTop: 70 }}>
              <Camera {...props} />
          </div>
          ) : (<Redirect to={Routes.WELCOME} />)
        )} /> 
        <Route
              path={Routes.USER_LOCATION_CLUE}
              exact
              render={(props) => (
              authContext.isAuthenticated() ? (
              <div style={{ marginTop: 70 }}>
                  <TopNav />
                  <ScoreNav/>
                  <LocationClues {...props} />
              </div>
             ) : (<Redirect to={Routes.WELCOME} />)
        )} /> 
        <Route
              path={Routes.USER_TEXT_CLUE}
              exact
              render={(props) => (
              authContext.isAuthenticated() ? (
              <div style={{ marginTop: 70 }}>
                  <TopNav />
                  <ScoreNav/>
                  <TextClues {...props} />
              </div>
             ) : (<Redirect to={Routes.WELCOME} />)
        )} /> 
        <Route
          path={Routes.USER_REQUEST}
          exact
          render={(props) => (
          authContext.isAuthenticated() ? (
            <UserAcceptReject {...props} />
          ) : (<Redirect to={Routes.WELCOME} />)
        )} />  
        <UserAuthenticatedRoute path={Routes.USER_LEADERBOARD} exact>
          <TopNav />
          <ScoreNav/>
          <div><NavBar select="scoreboard" /></div>
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

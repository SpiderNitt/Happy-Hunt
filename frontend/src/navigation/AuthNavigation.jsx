import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserRegistration from "../user/UserRegistration";
import GameIntro from "../user/GameIntro";

import VerificationEmail from "../user/VerificationEmail";
import UserLogin from "../user/UserLogin";
import Routes from "../utils/routes";
import useScript from "../hooks/useScript";


function AuthNavigation() {
  useScript(
    "https://embed.tawk.to/5ffc4538c31c9117cb6d70dc/1eromsq55",
    "auth",
    {
      key: "crossorigin",
      value: "*"
    }
  );
    return (
    <Router>
      <div className="auth">
        <Switch>
          <Route path={Routes.USER_REGISTER} component={UserRegistration}/>
          <Route path={Routes.USER_LOGIN} component={UserLogin}/>
          <Route path={Routes.USER_VERIFY} component={VerificationEmail}/>
          <Route path={Routes.WELCOME} exact component={GameIntro}/>
        </Switch>
      </div>
    </Router>
  )

}

export default AuthNavigation;

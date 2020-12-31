import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "../user/Home";
import UserRegistration from "../user/UserRegistration";
import Template from "../user/Template";

function UserNav() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={UserRegistration} />
          <Route path="/happy-hunt" exact component={Template} />
        </Switch>
      </div>
    </Router>
  )
}

export default UserNav;

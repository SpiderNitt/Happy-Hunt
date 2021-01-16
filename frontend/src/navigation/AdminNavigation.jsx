import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Drawer from "../admin/Drawer";
import DrawerHeader from '../admin/DrawerHeader';
import Mission from '../admin/Mission'
import Activity from '../admin/Activity.jsx'
import ScoreBoard from '../admin/ScoreBoard'
import AdminList from '../admin/AdminMembers'
import AdminMission from '../admin/AdminMission';
import Notification from '../admin/Notifications';
import MissionDetail from '../admin/MissionDetail'
import NewMission from '../admin/NewMission';
import EditMission from '../admin/EditMission';
import Routes from "../utils/routes";
import { getToken } from "../api/storage";

export default function AdminNav() {
    return (
        <Router>
            <div>
                <Switch>
                    {getToken() ? (
                        <>
                            <Route path={Routes.ADMIN_MISSIONS} exact>
                                <DrawerHeader title="Missions" />
                                <Drawer />
                                <div style={{ marginLeft: '10%' }}>
                                    <Mission />
                                </div>
                            </Route>
                            <Route path={Routes.ADMIN_ACTIVITY_FEED} exact>
                                <DrawerHeader title="Activity Feed" />
                                <Drawer />
                                <Activity />
                            </Route>
                            <Route path={Routes.ADMIN_LEADERBOARD} exact>
                                <DrawerHeader title="Score Board" />
                                <Drawer />
                                <ScoreBoard />
                            </Route>
                            <Route path={Routes.ADMIN_LIST} exact>
                                <DrawerHeader title="Admin List" />
                                <Drawer />
                                <AdminList />
                            </Route>
                            <Route path={Routes.ADMIN_MISSION_DETAILS} exact render={(props) => (<div><DrawerHeader title="Mission Details" /><Drawer /><MissionDetail {...props} /></div>)} />
                            <Route path={Routes.ADMIN_MISSION_UPDATE} exact>
                                <DrawerHeader title="Admin Mission" />
                                <Drawer />
                                <AdminMission />
                            </Route>
                            <Route path={Routes.ADMIN_NOTIFICATION} exact>
                                <DrawerHeader title="Notifications" />
                                <Drawer />
                                <Notification />
                            </Route>
                            <Route path={Routes.ADMIN_NEW_MISSION} exact>
                                <DrawerHeader title="ADD MISSION" />
                                <Drawer />
                                <NewMission />
                            </Route>
                            <Route path={Routes.ADMIN_EDIT_MISSION} exact render={(props) => (<div><DrawerHeader title="Edit Mission" /><Drawer /><EditMission {...props} /></div>)} />
                        </>
                    ) : <Redirect to={Routes.WELCOME} />}
                </Switch>
            </div>
        </Router >
    );
}
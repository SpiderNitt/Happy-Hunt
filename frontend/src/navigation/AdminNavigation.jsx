import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Redirect, Route, Switch } from "react-router-dom";
import Drawer from "../admin/Drawer";
import DrawerHeader from '../admin/DrawerHeader';
import Mission from '../admin/Mission'
import Activity from '../admin/Activity.jsx'
import ScoreBoard from '../user/Leaderbaord'
import AdminList from '../admin/AdminMembers'
import AdminMission from '../admin/AdminMission';
import Notification from '../admin/Notifications';
import MissionDetail from '../admin/MissionDetail'
import NewMission from '../admin/NewMission';
import EditMission from '../admin/EditMission';
import Routes from "../utils/routes";
import UserLogin from "../user/UserLogin";
import GameIntro from "../user/GameIntro";
import { AuthContext } from "../api/authContext";

const AdminRoute = ({ children, ...rest }) => {
    const auth = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={() =>
                auth.isAuthenticated() && auth.isAdmin() ? (
                    <>{children}</>
                ) : (
                        <Redirect to={Routes.WELCOME} />
                    )
            }
        ></Route>
    );
};

export default function AdminNav() {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState('admin');
    useEffect(() => {
        const email = auth.authState.userInfo.emailId;
        const trimmedUserName = email.substring(0, email.lastIndexOf("@"))
        setUsername(trimmedUserName);
    }, []);
    return (
        <>
            <Switch>
                <Route path={Routes.USER_LOGIN} component={UserLogin} />
                <Route path={Routes.WELCOME} exact component={GameIntro} />
                <AdminRoute path={Routes.ADMIN_MISSIONS} exact>
                    <DrawerHeader title="Missions" />
                    <Drawer username={username} title={username[0]} />
                    <div style={{ marginLeft: '10%' }}>
                        <Mission />
                    </div>
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_ACTIVITY_FEED} exact>
                    <DrawerHeader title="Activity Feed" />
                    <Drawer username={username} title={username[0]} />
                    <Activity />
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_LEADERBOARD} exact>
                    <DrawerHeader title="Score Board" />
                    <Drawer username={username} title={username[0]} />
                    <div style={{ marginTop: '5%', marginLeft: '7%' }}>
                        <ScoreBoard />
                    </div>
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_LIST} exact>
                    <DrawerHeader title="Admin List" />
                    <Drawer username={username} title={username[0]} />
                    <AdminList />
                </AdminRoute>
                <Route
                    path={Routes.ADMIN_MISSION_DETAILS}
                    exact
                    render={(props) => (
                        auth.isAuthenticated() && auth.isAdmin() ? (
                            <div>
                                <DrawerHeader title="Mission Details" />
                                <Drawer username={username} title={username[0]} />
                                <MissionDetail {...props} />
                            </div>) : (<Redirect to={Routes.WELCOME} />)
                    )} />
                <AdminRoute path={Routes.ADMIN_MISSION_UPDATE} exact>
                    <DrawerHeader title="Admin Mission" />
                    <Drawer username={username} title={username[0]} />
                    <AdminMission />
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_NOTIFICATION} exact>
                    <DrawerHeader title="Notifications" />
                    <Drawer username={username} title={username[0]} />
                    <Notification />
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_NEW_MISSION} exact>
                    <DrawerHeader title="ADD MISSION" />
                    <Drawer username={username} title={username[0]} />
                    <NewMission />
                </AdminRoute>
                <Route
                    path={Routes.ADMIN_EDIT_MISSION}
                    exact
                    render={(props) => (
                        auth.isAuthenticated() && auth.isAdmin() ? (
                            <div>
                                <DrawerHeader title="Edit Mission" />
                                <Drawer username={username} title={username[0]} />
                                <EditMission {...props} />
                            </div>
                        ) : (<Redirect to={Routes.WELCOME} />)
                    )} />
            </Switch>
        </>
    );
}
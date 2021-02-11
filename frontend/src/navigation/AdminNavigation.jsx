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

import { io } from "socket.io-client";
import Message from "../components/Message";

const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  console.log(socket.id);
});

const AdminRoute = ({ children, ...rest }) => {
    const auth = useContext(AuthContext);
    const [message, setmessage] = useState("");
    const listener = (...args) => {
        setmessage(args[0]);
    }
    socket.on(`Notifications`, listener);
    return (
        <Route
            {...rest}
            render={() =>
                auth.isAuthenticated() && auth.isAdmin() ? (
                    <>
                    {message && (
                        <Message
                        message={message}
                        type='info'
                        show={true}
                        setMessage={setmessage}
                        />
                    )}
                    {children}
                    </>
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
    const [message, setmessage] = useState("");
    const listener = (...args) => {
        setmessage(args[0]);
    }
    socket.on(`Notifications`, listener);
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
                    <div className="admin-container">
                        <DrawerHeader title="Missions" />
                        <Drawer username={username} title={username[0]} />
                        <div style={{ width:"100%" }}>
                            <Mission />
                        </div>
                    </div>
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_ACTIVITY_FEED} exact>
                    <div className="admin-container">
                        <DrawerHeader title="Activity Feed" />
                        <Drawer username={username} title={username[0]} />
                        <Activity />
                    </div>
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_LEADERBOARD} exact>
                    <div className="admin-container">
                        <DrawerHeader title="Score Board" />
                        <Drawer username={username} title={username[0]} />
                        <div style={{ margin:'auto',marginTop:'80px' }}>
                            <ScoreBoard />
                        </div>
                    </div>
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_LIST} exact>
                    <div className="admin-container">
                        <DrawerHeader title="Admin List" />
                        <Drawer username={username} title={username[0]} />
                        <AdminList />
                    </div>
                </AdminRoute>
                <Route
                    path={Routes.ADMIN_MISSION_DETAILS}
                    exact
                    render={(props) => (
                        auth.isAuthenticated() && auth.isAdmin() ? (
                            <div className="admin-container">
                                <DrawerHeader title="Mission Details" />
                                <Drawer username={username} title={username[0]} />
                                <MissionDetail {...props} />
                            </div>) : (<Redirect to={Routes.WELCOME} />)
                    )} />
                <AdminRoute path={Routes.ADMIN_MISSION_UPDATE} exact>
                    <div className="admin-container">
                        <DrawerHeader title="Admin Mission" />
                        <Drawer username={username} title={username[0]} />
                        <AdminMission />
                    </div>
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_NOTIFICATION} exact>
                    <div className="container admin-container">
                        <DrawerHeader title="Notifications" />
                        <Drawer username={username} title={username[0]} />
                        <Notification />
                    </div>
                </AdminRoute>
                <AdminRoute path={Routes.ADMIN_NEW_MISSION} exact>
                    <div className="admin-container">
                        <DrawerHeader title="ADD MISSION" />
                        <Drawer username={username} title={username[0]} />
                        <NewMission />
                    </div>
                </AdminRoute>
                <Route
                    path={Routes.ADMIN_EDIT_MISSION}
                    exact
                    render={(props) => (
                        auth.isAuthenticated() && auth.isAdmin() ? (
                            <div className="admin-container">
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
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from "../admin/Drawer";
import Mission from '../admin/Mission'
import Activity from '../admin/Activity.jsx'
import ScoreBoard from '../admin/ScoreBoard'
import AdminList from '../admin/AdminMembers'
import AdminMission from '../admin/AdminMission';
import Notification from '../admin/Notifications';
import MissionDetail from '../admin/MissionDetail'
import NewMission from '../admin/NewMission';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import { ChatBubble } from '@material-ui/icons';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Routes from "../utils/routes";

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function AdminNav() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = React.useState('Missions');
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const onTitleChange = (title) => {
        setTitle(title);
    }
    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            {title}
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <ChatBubble />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" href="/admin/notification">
                            <Badge badgeContent={3} color="secondary">
                                <NotificationsActiveIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer onTitleChange={onTitleChange} />
                <Switch>
                    <Route exact from={Routes.ADMIN_MISSIONS} render={props => <Mission {...props} />} />
                    <Route exact path={Routes.ADMIN_ACTIVITY_FEED} render={props => <Activity {...props} />} />
                    <Route exact path={Routes.ADMIN_MISSION_DETAILS} render={props => <MissionDetail {...props} />} />
                    <Route exact path={Routes.ADMIN_LEADERBOARD} render={props => <ScoreBoard {...props} />} />
                    <Route exact path={Routes.ADMIN_LIST} render={props => <AdminList {...props} />} />
                    <Route exact path={Routes.ADMIN_MISSION_EDIT} render={props => <AdminMission {...props} />} />
                    <Route exact path={Routes.ADMIN_NEW_MISSION} component={NewMission} />
                    <Route exact path={Routes.ADMIN_NOTIFICATION} component={Notification} />
                </Switch>
            </div>
        </Router>
    );
}
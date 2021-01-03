import React from "react";
import {
    Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ScoreIcon from '@material-ui/icons/Score';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: "190px"
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    }
}));

const Drawer = props => {
    const { history } = props;
    const classes = useStyles();
    const itemsList = [
        {
            text: "Mission",
            icon: <DashboardIcon />,
            onClick: () => {
                props.onTitleChange('Missions')
                history.push("/")
            }
        },
        {
            text: "Activity",
            icon: <DynamicFeedIcon />,
            onClick: () => {
                props.onTitleChange('Activity feed')
                history.push("/activity")
            }
        },
        {
            text: "Score Board",
            icon: <ScoreIcon />,
            onClick: () => {
                props.onTitleChange('Score Board')
                history.push("/scoreboard")
            }
        },
        {
            text: "Logout",
            icon: <ExitToAppIcon />,
            onClick: () => history.push("/logout")
        }
    ];
    const adminList = [
        {
            text: "Admin List",
            icon: <ListIcon />,
            onClick: () => {
                props.onTitleChange('Admin List');
                history.push('/adminlist')
            }
        },
        {
            text: "Missions",
            icon: <EditIcon />,
            onClick: () => {
                props.onTitleChange('Update mission');
                history.push('/mission/edit');
            }
        }
    ]
    return (
        <MUIDrawer variant="permanent" className={classes.drawer} open="true">
            <div className={classes.toolbarIcon}>
                <Avatar className={classes.orange}>S</Avatar>
                <div>
                    <div>Sanju Samson</div>
                </div>
            </div>
            <List>
                {itemsList.map((item, index) => {
                    const { text, icon, onClick } = item;
                    return (
                        <div>
                            <ListItem button key={text} onClick={onClick}>
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text} />
                            </ListItem>
                            <Divider />
                        </div>
                    );
                })}
            </List>
            <h1>Admin</h1>
            <List>
                {adminList.map((item, index) => {
                    const { text, icon, onClick } = item;
                    return (
                        <div>
                            <ListItem button key={text} onClick={onClick}>
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text} />
                            </ListItem>
                            <Divider />
                        </div>
                    );
                })}
            </List>
        </MUIDrawer>
    );
};

export default withRouter(Drawer);

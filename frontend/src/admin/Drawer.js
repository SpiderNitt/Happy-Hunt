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

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: "190px"
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
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
    return (
        <MUIDrawer variant="permanent" className={classes.drawer} open="true">
            <div className={classes.toolbarIcon}>

            </div>
            <List>
                {itemsList.map((item, index) => {
                    const { text, icon, onClick } = item;
                    return (
                        <ListItem button key={text} onClick={onClick}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                            <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
            </List>
        </MUIDrawer>
    );
};

export default withRouter(Drawer);

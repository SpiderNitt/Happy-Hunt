import { Avatar, Container, Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import { Add, Edit, ExitToApp, GroupAdd } from '@material-ui/icons';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../utils/routes';
import {AuthContext} from '../api/authContext.js';
import useAuth from '../hooks/useAuth';
import client from '../api/client';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5%',
    },
    inline: {
        display: 'inline',
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    items: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    listContainer: {
        marginTop: 20,
        marginBottom: 20,
    }
}))

function ProfilePage(props) {
    const authContext = useContext(AuthContext)
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetch = async () => {
          const result = await client.get('api/player/profile')
          setData(result.data);

          
      }
      fetch();
      console.log (data)
  }, [])
    return (
        <Container maxWidth="md" >
            <div className={classes.root}>
                <Avatar alt="Remy Sharp" className={classes.large} />
            </div>
            <List className={classes.listContainer}>
                <ListItem className={classes.items}>
                    <ListItemText primary={`Name: ${data.name}`} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <Edit />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem className={classes.items}>
                    <ListItemText primary={`Email Id: ${data.emailId}`} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <Edit />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem className={classes.items}>
                    <ListItemText primary={`Mobile no: ${data.phoneNo}`} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <Edit />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem style={{ marginTop: 20 }} component={Link} to={Routes.USER_REGISTER_TEAM}>
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                        <ListItemText primary="Create Team" />
                    </ListItem>
                <ListItem component={Link} to={Routes.USER_JOIN_TEAM}>
                <ListItemIcon>
                    <GroupAdd />
                </ListItemIcon>
                    <ListItemText primary="Join Team" />
                </ListItem>
                <ListItem style={{ marginBottom: 20 }} component="button" onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToApp />
                </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Container>
    );
}

export default ProfilePage;


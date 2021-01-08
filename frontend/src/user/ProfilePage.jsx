import { Avatar, Container, Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import { Edit, ExitToApp } from '@material-ui/icons';
import React from 'react';

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
    const classes = useStyles();
    return (
        <Container maxWidth="md" >
            <div className={classes.root}>
                <Avatar alt="Remy Sharp" className={classes.large} />
            </div>
            <List className={classes.listContainer}>
                <ListItem className={classes.items}>
                    <ListItemText primary="name" />
                    <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <Edit />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem className={classes.items}>
                    <ListItemText primary="emailID" />
                    <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <Edit />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem className={classes.items}>
                    <ListItemText primary="Mobile Number" />
                    <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <Edit />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem className={classes.items}>
                    <ListItemText primary="Gender" />
                    <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <Edit />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem style={{ marginTop: 20, marginBottom: 20 }}>
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


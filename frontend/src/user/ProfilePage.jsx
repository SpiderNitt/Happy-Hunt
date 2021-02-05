import { Avatar, Container, Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import { Add, Edit, ExitToApp, FileCopyOutlined, GroupAdd } from '@material-ui/icons';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Routes from '../utils/routes';
import {AuthContext} from '../api/authContext.js';
import client from '../api/client';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Message from '../components/Message';
import colors from '../utils/colors';
import LoadingPage from '../components/LoadingPage';

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


const ObjIsEmpty = (obj) => {
    if(!obj || obj === undefined){
        return true;
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function ProfilePage(props) {
    const authContext = useContext(AuthContext)
    const classes = useStyles();
    const [loading, setloading] = useState(true);
    const [message, setmessage] = useState('')
    const [messageType, setmessageType] = useState('')
    const [UserInfo, setUserInfo] = useState({});
    const [TeamInfo, setTeamInfo] = useState({});
    const [copy,setCopy] = useState(false);
    const history = useHistory();
    const handleLogout = () => {
        authContext.logout();
        history.push(Routes.USER_LOGIN);
    }
    const fetch = async () => {
        const result = await client.get('api/player/profile')
        setloading(false);
        if(!result.ok){
            // console.log(result.status, result.originalError, result.problem);
            // console.log(result.data);
            setmessage(result.data.message);
            setmessageType("error");
            return;
        }
        setUserInfo(result.data);
        // console.log(result.data.team !== undefined, TeamInfo);
        if(result.data.team !== undefined) setTeamInfo(result.data.team);
    }

    useEffect(() => {
      fetch();
    }, [])

    if(loading){
        return <LoadingPage />
    }

    return (
        <Container maxWidth="md" >
            {message && <Message message={message} show={true} type={messageType} setMessage={setmessage} />}
            <div className={classes.root}>
                <Avatar alt="Remy Sharp" className={classes.large} />
            </div>
            {UserInfo && <List className={classes.listContainer}>
                <ListItem className={classes.items}>
                    <ListItemText primary={`Name: ${UserInfo.name}`} />
                    <ListItemSecondaryAction>
                    {/* <IconButton edge="end">
                        <Edit />
                    </IconButton> */}
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem className={classes.items}>
                    <ListItemText primary={`Email Id: ${UserInfo.emailId}`} />
                    <ListItemSecondaryAction>
                    {/* <IconButton edge="end">
                        <Edit />
                    </IconButton> */}
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem className={classes.items}>
                    <ListItemText primary={`Mobile no: ${UserInfo.phoneNo}`} />
                    <ListItemSecondaryAction>
                    {/* <IconButton edge="end">
                        <Edit />
                    </IconButton> */}
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                {
                !ObjIsEmpty(TeamInfo) &&
                <>
                <h2 style={{ fontFamily: 'monospace', backgroundColor: colors.light, paddingTop: 5, paddingBottom: 5 }}>Team</h2>
                <ListItem className={classes.items}>
                    <ListItemText primary={`Role`} secondary={UserInfo.Role==="TeamLeader" ? "Team Admin" : "Team Member"} />
                </ListItem>
                <Divider />
                <ListItem className={classes.items}>
                    <ListItemText primary={`Team Name`} secondary={TeamInfo.teamName} />
                </ListItem>
                <Divider />
                <ListItem className={classes.items}>
                    <ListItemText primary={`Team Id`} secondary={TeamInfo.teamId} />
                    <ListItemSecondaryAction>
                    <CopyToClipboard text={TeamInfo.teamId}
                        onCopy={() => {
                            setCopy(true);
                            setmessage("Team ID copied!");
                            setmessageType("success");
                        }}>
                        <IconButton edge="end">
                            <FileCopyOutlined />
                        </IconButton>
                    </CopyToClipboard>
                    </ListItemSecondaryAction>
                </ListItem>
                </>
                // :
                // <>
                // <ListItem style={{ marginTop: 20 }} component={Link} to={Routes.USER_REGISTER_TEAM}>
                //     <ListItemIcon>
                //         <Add />
                //     </ListItemIcon>
                //         <ListItemText primary="Create Team" />
                //     </ListItem>
                // <ListItem component={Link} to={Routes.USER_JOIN_TEAM}>
                // <ListItemIcon>
                //     <GroupAdd />
                // </ListItemIcon>
                //     <ListItemText primary="Join Team" />
                // </ListItem>
                // </>
                }
                <ListItem style={{ marginBottom: 20 }} component={Link} onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToApp />
                </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>}
        </Container>
    );
}

export default ProfilePage;
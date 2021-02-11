import { Avatar, Container, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles,Typography } from '@material-ui/core';
import { Edit, ExitToApp, FileCopyOutlined} from '@material-ui/icons';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Routes from '../utils/routes';
import {AuthContext} from '../api/authContext.js';
import client from '../api/client';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Message from '../components/Message';
import LoadingPage from '../components/LoadingPage';
import { TextareaAutosize } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    items: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    listContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
       margin:5,
       float:"left"
    },
    teamInfo:{
        backgroundColor: '#544b80',
        color:'white',
        borderRadius:'5px',
        padding:'5px'
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
    const [input, setInput]= useState('');
    const [TeamInfo, setTeamInfo] = useState({});
    const [copy,setCopy] = useState(false);
    const [open,setOpen] = useState(false);
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
    }, []);

    const handleOpen=()=>{
        setOpen(!open)
    }
    console.log(open);

    const handleChange= (e)=>{
        setInput(e.target.value)
    }
    // console.log(input)

    const handleUpdate= async ()=>{
        const body={
            name: input
        }
        console.log (body)
        const result= await client.patch('api/player/update', body);
        console.log(result)
        if(!result.ok){
            console.log(result, result.originalError, result.problem, result.status);
            console.log(result.data.message)
            return;
        }
        window.location.reload(false);   
    }

    if(loading){
        return <LoadingPage />
    }

    return (
        <Container maxWidth="md" >
            {message && <Message message={message} show={true} type={messageType} setMessage={setmessage} />}
            <Typography component="h1" variant="h4" style={{  textDecorationLine: 'underline', color: '#213B4B' }}>
               My profile
            </Typography>
            {UserInfo && <List className={classes.listContainer}>
                <ListItem className={classes.items}>
                    <ListItemText disableTypography primary={<Typography type="body2"><span style={{color:'#213B4B',fontWeight:'bold'}}>Name: </span> {UserInfo.name}</Typography>} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <Edit onClick={handleOpen}/>
                    </IconButton>
                    {open && 
                    <div className={classes.input} noValidate autoComplete="off">
                    <TextareaAutosize style={{fontSize:15, padding:7, minHeight:10, maxWidth:200}}
                    placeholder="New name" 
                    required
                    value={input}
                    onChange={handleChange}
                    />
                    </div>}
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.items}>
                    <ListItemText primary={<Typography type="body2"><span style={{color:'#213B4B',fontWeight:'bold'}}>Email: </span> {UserInfo.emailId}</Typography>} />
                </ListItem>
                <ListItem className={classes.items}>
                    <ListItemText primary={<Typography type="body2"><span style={{color:'#213B4B',fontWeight:'bold'}}>Phone: </span> {UserInfo.phoneNo}</Typography>} />
                </ListItem>
                {open && 
                    <Button onClick={handleUpdate} style={{color:"white", backgroundColor:"green", padding:7, borderRadius:7, margin:10}}>Update</Button>
                }

                {!ObjIsEmpty(TeamInfo) &&
                <>
                <div className={classes.teamInfo}>
                <div className={classes.root}>
                   <Avatar alt="Remy Sharp" className={classes.large} />
                 </div>
                <h2 style={{textDecoration:'underline'}}>Team Details</h2>
                <ListItem className={classes.items}>
                    <ListItemText primary={<Typography type="body2"><span style={{fontWeight: 'bold'}}>Your Role:</span> {UserInfo.Role==="TeamLeader" ? "Team Admin" : "Team Member"} </Typography>} />
                </ListItem>
                <ListItem className={classes.items}>
                    <ListItemText primary={<Typography type="body2"><span style={{fontWeight:'bold'}}>Name:</span> {TeamInfo.teamName} </Typography>} />
                </ListItem>
                <ListItem className={classes.items}>
                    <ListItemText primary={<Typography type="body2"><span style={{fontWeight:'bold'}}>ID:</span> {TeamInfo.teamId} </Typography>} />
                    <ListItemSecondaryAction>
                    <CopyToClipboard text={TeamInfo.teamId}
                        onCopy={() => {
                            setCopy(true);
                            setmessage("Team ID copied!");
                            setmessageType("success");
                        }}>
                        <IconButton edge="end">
                            <FileCopyOutlined style={{color:'white'}} />
                        </IconButton>
                    </CopyToClipboard>
                    </ListItemSecondaryAction>
                </ListItem>
                </div>
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
                <ListItem style={{ marginTop: 20 ,marginBottom:20}} component={Link} onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToApp />
                </ListItemIcon>
                    <ListItemText primary={<Typography type="body2" style={{color:'00CCFF'}}>Logout</Typography>} />
                </ListItem>
                <ListItem style={{marginTop:-15}}>
                    <ListItemText primary={<Typography type="body2" style={{color:'blue'}}>View Rules and Regulations</Typography>} />
                </ListItem>
            </List>}
        </Container>
    );
}

export default ProfilePage;
import React from 'react';
import Box from '@material-ui/core/Box';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import{ Link } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

function Profile(props) {
    const classes= useStyles();
    return (
            <div className={classes.box}>
                <CssBaseline />
                <AccountBoxTwoToneIcon className={classes.icon}/>
                <br/>
                <h2>User Name</h2>
                <h3>Email :</h3>
                <h3>Team :</h3>
                <br/>
                <Link className={classes.post} href="/posts">My posts</Link>
                <Link className={classes.link} href="/logout">Logout</Link>
          
        </div>
           
    );
}

const useStyles= makeStyles(
    {
        box:{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        },
        icon:{
            fontSize:70,
            color:"navy"
        },
        link:{
            fontSize:16,
            fontStyle:"italic",
            padding:15
        },
        post:{
            fontSize:16,
            fontStyle:"italic",
            padding:15
        }
    }
)

export default Profile;
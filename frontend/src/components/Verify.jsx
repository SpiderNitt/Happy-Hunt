import React , {useEffect, useState} from 'react';
import client from '../api/client';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function Verify() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const fetch = async () => {
        const result = await client.get('api/player/profile')
        if(!result.ok){
            console.log(result.status, result.originalError, result.problem);
            console.log(result.data);
           
            return;
        }
        setEmail(result.data.emailId);
        console.log(email)
    }

    useEffect(() => {
      fetch();
    }, [])
    return (
        <div className={classes.body}>
            <div className={classes.main}>
                <MailOutlineIcon className={classes.icon}/>
            </div>
            
            <h1 className={classes.heading}>Confirm your email address</h1>
            <p className={classes.main}>Your Confirmation email has been sent to {email} </p>
            <p className={classes.main}>Click on the link in the email to activate your account. </p>
            <br/>
            <p className={classes.small}>Not receiving the email?</p>
            <p className={classes.main} style={{color:"gray"}}>Please check your spam/junk folder.</p>
        </div>      
    );
}

const useStyles = makeStyles((theme) => ({
    body: {
        fontFamily:"tahoma" ,
        marginTop: window.innerHeight*0.2   
    },
    main: {
        display: 'flex',
        justifyContent: "center",
       
    },
    heading: {
        display: 'flex',
        justifyContent: "center",
        fontWeight:'100'
       
    },
    small: {
        display: 'flex',
        justifyContent: "center",
        color:'navy'
       
    },
    icon: {
        fontSize: 80,
        color:'navy'
    }
}))


export default Verify;

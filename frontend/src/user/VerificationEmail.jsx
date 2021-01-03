import { Container, Link, makeStyles, Typography } from '@material-ui/core';
import { EmailSharp } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: { 
        display: 'flex', 
        flexDirection: 'column',  
        alignItems: 'center',
        paddingTop: '20%',
    }
}))

function VerificationEmail(props) {
    const styles = useStyles();
    return (
        <Container className={styles.root}>
            <div style={{ fontSize: 50 }}>
                <EmailSharp fontSize="inherit" />
            </div>
            <Typography variant="button" style={{ marginTop: 30, fontWeight: 'bold' }}>
                Verify your Email Address
            </Typography>
            <Link
            component="button"
            variant="body1"
            onClick={() => {
                console.info("resent email!!");
            }}
            >
                resend email
            </Link>
        </Container>
    );
}

export default VerificationEmail;
import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Box, Container, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './sample.css';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { GroupAdd, PersonAddRounded, ExitToApp } from '@material-ui/icons';
import logo from './assets/1612244120230_HHC logo.svg';

const useStyles1 = makeStyles((theme) => ({
  paper: {
    padding: 10,
    backgroundColor: '#ffffff60',
    fontFamily: ['Londrina', 'Solid', 'cursive'],
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function CustomizedTimeline() {
  const classes = useStyles1();

  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" fontSize="large">
            <PersonAddRounded fontSize="large" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <b>Register</b> <br/>
            Register with your Email ID
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" fontSize="large">
            <ExitToApp fontSize="large" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <b>Login</b>  <br/>
            Login to your account
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" fontSize="large">
            <GroupAdd fontSize="large" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <b>Team</b>  <br/>
            Create your own team or join in existing one
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" variant="outlined" fontSize="large">
            🎉
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <b>Happy Hunt!</b>  
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}



const useStyles2 = makeStyles((theme) => ({
    box: {
        padding: 10,
        textAlign: 'center',
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // backgroundColor: '#ffffff50',
        borderRadius: 15,
        margin: 10,
    },
    fontStyle1: {
        fontFamily: ['Lobster', 'cursive'],
        fontSize: 24,
    },
    fontStyle2: {
        fontFamily: ['Londrina', 'Solid', 'cursive'],
        fontSize: 18,
    },
}))




function SampleHomePage(props) {
    const classes = useStyles2();
    AOS.init({
        duration: 1000,
    });
    return (
        <Container maxWidth="md" className="container">
        <Grid spacing={3}>
        <img src={logo} alt="logo" width='100%' />
            <Grid item xs={12} style={{ paddingRight: '30%' }} className={[classes.fontStyle1, classes.box]}>
                <Box  data-aos="slide-right" style={{ textAlign: 'left', fontSize: 36 }}>
                    Aren't you fed
                    up of sitting at
                    home?
                </Box>
            </Grid>
            <Grid item xs={12} className={[classes.fontStyle1, classes.box]} style={{ paddingLeft: '30%' }}>
                <Box  data-aos="slide-left" style={{ textAlign: 'right', fontSize: 36 }}>
                    Aren't you tired
                    of mindlessly
                    scrolling through
                    stuff ?
                </Box>
            </Grid>
            <Grid item xs={12} className={[classes.fontStyle1, classes.box]} style={{ paddingRight: '30%' }}>
                <Box  data-aos="slide-right" style={{ textAlign: 'left', fontSize: 36 }}>
                    Are you
                    looking for an
                    adventure?
                </Box>
            </Grid>
            <Grid item xs={12} className={[classes.fontStyle2, classes.box]} style={{ paddingLeft: '20%' }}>
                <Box  data-aos="slide-left" style={{ padding: 10, textAlign: 'right' }}>
                <p className={classes.fontStyle1}> How does one find freedom in these times?</p>
                <b>THE BIG IDEA</b> 
                <br/>
                With in the safety of a personal vehicle, teams drive around the city solving a series of challenges for a chance to win big, but the real treat is to spend the day engaged in an innovative and bonding series of activities.. 
                </Box>
            </Grid> 
            <Grid item xs={12} className={[classes.fontStyle2,classes.box]} style={{ paddingRight: '20%' }}>
                <Box  data-aos="slide-right" style={{ padding: 10, textAlign: 'left' }}>
                <p className={classes.fontStyle1}>Designed for our crazy times!</p>
                <br/>
                folks are tired of being locked up and
                now keen to get out and do stuff,
                while yet being cautious. <br/> <br/>
                This activity is designed so folks do
                not get into crowds or gather 
                anywhere in their city. <br/> <br/>
                Contactless travel with contactless pit
                stops. <br/> <br/>
                One Team (Family / friends) per car
                and you dont need to get out of your
                car! <br/> <br/>
                Has a great social distancing message.
                </Box>
            </Grid>       
            <Grid item xs={12} className={[classes.fontStyle1, classes.box]}>
                <Box  data-aos="zoom-out" style={{ textAlign: 'center', fontSize: 36 }}>
                A hunt for the best car
                detective team. <br/> <br/>
                + <br/> <br/>
                A Sunday of adventure,
                creativity and family bonding.
                </Box>
            </Grid>     
            <Grid item xs={12}>
                <CustomizedTimeline />
            </Grid>
            
        </Grid>
        </Container>
    );
}

export default SampleHomePage;




import Button from '@material-ui/core/Button';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rules from './Rules';
import Routes from '../utils/routes';
import client from '../api/client';
import Message from '../components/Message';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  welcome: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  video: {
    width: '100%',
    height: 200,
  }
}));


function Home(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData]= useState("");
  const [disable, setDisable]= useState(true);
  const [coords, setCoords]= useState({});
  const [message, setmessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const onSuccess = (location) => {
    setCoords({
      lat: location.coords.latitude,
      long: location.coords.longitude
    })
    setDisable(false);;
  };

  const onError = error =>{
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setmessage("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setmessage("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setmessage("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setmessage("An unknown error occurred.");
        break;
      default:
        setmessage("Error");
    }
    setMessageType("error");
  };

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess,onError);
    } else {
      setmessage("Geolocation is not supported by this browser.");
    }
  }

  const fetch = async () => {
    const result = await client.get('api/countdown')
    if(!result.ok){
      console.log(result.originalError, result.problem, result.status);
      return;
    }
    setData(result.data.timeReamaining);
    console.log(result.data)  
  }

  useEffect(() => {
    fetch();
  }, []);

  const handleOpen = async() => {
    const body = {
      Location:{
        coords:{
          latitude:coords.lat,
          longitude:coords.long
        }
      }
    }
    const result = await client.post('api/team/location', body);
    if(!result.ok){
      console.log(result, result.originalError, result.problem, result.status);
      console.log(result.data.message);
      return;
    }
    console.log(result);
    setTimeout(() => {
      setOpen(true);
    }, 500);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div className={classes.welcome}>
      <CssBaseline />
      {message && <Message message={message} show={true} type={messageType} setMessage={setmessage} />}
      <h1 style={{fontFamily:"tahoma"}}>Welcome!</h1>
      <div>
      <h3 style={{fontFamily:"tahoma"}}>Happy Hunt Challenge</h3>
      <p style={{fontFamily:"tahoma"}}>Time to hunt: 
        <span style={{ color:"red"}}> {data.days} days </span>
        <span  style={{ color:"blue"}}> {data.hours} hour </span>
        <span  style={{ color:"gray"}}> {data.minutes} minutes </span></p>
      <Button variant="outlined" color="primary" onClick={getUserLocation}>Allow Location Sharing</Button>
      <br/>
      <br/>
      <Button variant="outlined" color="secondary" onClick={handleOpen} disabled={disable}>start</Button>
      <br/>
      <br/>
      <iframe 
      title="howToPlay"
      className={classes.video} 
      src="https://www.youtube.com/embed/4FGj5MTLGFs" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen></iframe>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Rules/>
            <Button variant="contained" color="primary" href={Routes.USER_CLUES} style={{margin:5}}>
                Start Game !
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  </div>
  );
}

export default Home;


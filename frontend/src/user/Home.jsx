import Button from '@material-ui/core/Button';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rules from './Rules';
import Routes from '../utils/routes';
import client from '../api/client';

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
    const [getLocation, setLocation]= useState({
      loaded:false,
      coordinates: {lat:"", long:""}
  });
    
  const onSucces = location=>{
    setLocation({
        loaded:true,
        coordinates:{
            lat: location.coords.latitude,
            long: location.coords.longitude
        }
    })
};
 
  
useEffect(()=>{
  navigator.geolocation.getCurrentPosition(onSucces);

}, []);

console.log(getLocation);

    const fetch = async () => {
      const result = await client.get('api/countdown')
      if(!result.ok){
        console.log(result.originalError, result.problem, result.status);
        return;
      }
      setData(result.data.timeReamaining);
      console.log(result.data)
      
    }

    console.log(getLocation)
    const body= {
      "Location":{
          "coords":{
              "latitude":getLocation.coordinates.lat,
              "longitude":getLocation.coordinates.long
          }
      }
  }
    const getTeamLeadersLocation = async () => {
      const result = await client.post('api/team/location', body)
      if(!result.ok){
        console.log(result, result.originalError, result.problem, result.status);
        return;
      }
      console.log(result)
      
    }

    useEffect(() => {
      fetch();
      getTeamLeadersLocation();
    }, []);
  
    const handleOpen = () => {
      setOpen(true);
    };

    useEffect(() => {
      fetch();
      getTeamLeadersLocation();
    }, []);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
    <div className={classes.welcome}>
      <h1 style={{fontFamily:"tahoma"}}>Welcome!</h1>
      <div>
      <h3 style={{fontFamily:"tahoma"}}>Happy Hunt Challenge</h3>
      <p style={{fontFamily:"tahoma"}}>Time to hunt: 
        <span style={{ color:"red"}}> {data.days} days </span>
        <span  style={{ color:"blue"}}> {data.hours} hour </span>
        <span  style={{ color:"gray"}}> {data.minutes} minutes </span></p>
      <Button variant="outlined" color="secondary" onClick={handleOpen}>start</Button>
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


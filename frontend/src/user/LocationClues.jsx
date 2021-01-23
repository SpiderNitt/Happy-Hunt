import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Routes from "../utils/routes";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Hints from './Hints';

function LocationClues(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [location, setLocation]= useState({
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
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(onSucces);

    }, []);

    console.log(location);
    return (
        
        <React.Fragment >

            <Container maxWidth="sm" style={{height: '100vh', marginTop:"20vh" }}>
                <h4 style={{color:'#50EFE6',
                    fontSize:25,
                    fontFamily:'tahoma', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:12}}>
                        Mission : Let's pass by!
                </h4>
                <p style={{color:"black",
                    fontSize:16,
                    fontFamily:'calibri',
                    display:'flex', alignItems:'center', justifyContent:'center'}}>What to do: <span style={{marginLeft:5}}> Follow the instructions as given below</span>
                </p>
                <div className={classes.task1}>
                   <p>
                    "If you got a sweet tooth, 
                     <br/>  I can tell you where to come 
                    <br/> We are here at the east street,
                    <br/> Just follow the biscuit crumbs."  
                    
                    </p>
                </div>
                <p className={classes.points}>100 points</p>
                <br/>
                <br/>
                <br/>
                <div>
                    <LocationOnIcon className={classes.icon} />
                </div>
                
                {/* <p style={{fontSize:12, fontStyle: 'italic',fontFamily:'tahoma', color:"whitesmoke", display:'flex', justifyContent:'center'}}>
                    { location ? JSON.stringify(location) : " Location data not available."}
                </p> */}
                <br/>
                <br/>
                <Button className={classes.Button} href={Routes.USER_CLUES}>Back to clues</Button>
                <Button className={classes.Button}  href="/photo">Take Picture!</Button>
                <Button className={classes.Button}  onClick={handleOpen}>Hint</Button>
                
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
                    <Hints/>
                </div>
                </Fade>
                </Modal>
                </Container>
            </React.Fragment>
      );
}

const useStyles = makeStyles((theme)=>({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
          backgroundColor: "whitesmoke",
          borderRadius:10,
          margin: 10
        },
        },
    task1: {
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
        color:'gray',
        fontSize:18,
        fontFamily:'tahoma'
      },
      points: {
        float:"right", 
        fontStyle:"italic",
        fontSize: 16, 
        color:'gray',
        fontFamily:'tahoma'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
    },
    button: {
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
        color:'white',
        fontSize:20,
        fontFamily:'tahoma'
      },
      Button:{
      color:'white', 
      fontFamily:'tahoma', 
      backgroundColor:"gray",
      margin:5
    },
    icon: {
        fontSize:65,
        color:"#EF7257"
    },
    }));

export default LocationClues;


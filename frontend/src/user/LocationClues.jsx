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
import client from '../api/client'

function LocationClues(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data, setData]= useState({});
    const [clues,setClues] = useState([]);
    const [hints,setHints] = useState([]);
    const [evaluation, showEvaluation]= useState(false);
    const [disable, setDisable]= useState(true);
    const [ans, setAns]= useState("");
    const [location, setLocation]= useState({
        loaded:false,
        coordinates: {lat:"", long:""}
    });
    
    const fetch = async () => {
        const result = await client.get(`/api/mission/${props.match.params.id}`);
        console.log(result);
        if(!result.ok){
            console.log(result.status, result.problem, result.originalError);
            return;
        }
        // console.log(result.data);
        await setData(result.data.mission);
        await setClues(result.data.mission.clue);
        await setHints(result.data.hint)
        // console.log(data);
    }

    useEffect(() => {
        fetch();
    },[]);

    const onSuccess = location=>{
        setLocation({
            loaded:true,
            coordinates:{
                lat: location.coords.latitude,
                long: location.coords.longitude
            }
        })
    };

    const getLocation=()=>{
        navigator.geolocation.getCurrentPosition(onSuccess);
        setDisable(false);
    };
    console.log(location)
      const submitAnswer = async () => {
        const body= {
            MissionId:props.match.params.id,
            Location:{
                coords:{
                    latitude:location.coordinates.lat,
                    longitude:location.coordinates.long
                }
            }
        }
        const result = await client.post('api/player/locationSubmission', body)
        if(!result.ok){
          console.log(result, result.originalError, result.problem, result.status);
          console.log(result.data.message)
          setAns(result.data.message)
          showEvaluation(true)
          return;
        }
        showEvaluation(true)
        setAns(result.data.message)
      }
    //   console.log(ans);
  
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    return (
        
        <React.Fragment >
            {data !== {} && <Container maxWidth="sm" style={{height: '100vh', marginTop:"20vh" }}>
                <h4 style={{color:'#50EFE6',
                    fontSize:25,
                    fontFamily:'tahoma', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:12}}>
                        Mission : {data.MissionName}
                </h4>
                <p style={{color:"black",
                    fontSize:16,
                    fontFamily:'calibri',
                    display:'flex', alignItems:'center', justifyContent:'center'}}>
                        {data.Other_Info} 
                </p>
                {clues !== [] && clues.map((clue, index) => (
                    <div key={index} index={index + 1}>
                    <p>{clue.text}</p>
                    {clue.photos && <img src={clue.photos} style={{width:'100%'}} alt="location-clue" />}
                    </div>
                ))} 
                <p className={classes.points}>{data.maxPoints}</p>
                <br/>
                <br/>
                <br/>
                <div>
                    <LocationOnIcon className={classes.icon} onClick={getLocation}/>
                </div>
                {evaluation? <p>{ans}</p>: ''}
                <br/>
                <br/>
                <Button className={classes.Button} href={Routes.USER_CLUES}>Back to clues</Button>
                <Button className={classes.Button} onClick={submitAnswer}  disabled={disable}>Submit my Location</Button>
                {!data.isBonus ? (<div>
                    <Button className={classes.Button} onClick={handleOpen} >Hint</Button>
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
                    {hints && <Hints id={data._id} data={hints} />}
                </div>
                </Fade>                
                </Modal>
                </div>) :''}
                </Container>}
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
        color:'black',
        backgroundColor:"gray",
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
        color:"#EF7257",
        cursor:"pointer"
    },
    }));

export default LocationClues;


import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { create } from 'apisauce';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Hints from './Hints';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Routes from '../utils/routes';
import client from '../api/client';
import Capture from './Photogragh';
import Message from '../components/Message';

const api = create({
    baseURL: 'https://api.cloudinary.com/v1_1/dqj309mtu/image',
})

function PictureClues(props) {
    const classes = useStyles();
    const [dataUri, setDataUri] = useState('');
    const [data, setData]= useState([]);
    const [hints,setHints] = useState([]);
    const [imageSelected, setImageSelected] = useState("");
    const [evaluation, showEvaluation]= useState(false);
    const [clues,setClues] = useState([]);
    const [open, setOpen] = useState(false);
    const [onCam, setonCam] = useState(false);
    const [ans, setAns]= useState("");
    const [message, setmessage] = useState('');
    const [messageType, setmessageType] = useState('');
    const [eventEnd, setEventEnd] = useState(false);
    const [location, setLocation]= useState({
        loaded:false,
        coordinates: {lat:"", long:""}
    });
    // console.log(onCam);

    const fetch = async () => {
        const result = await client.get(`api/mission/${props.match.params.id}`);
        console.log(result.data);
        await setData(result.data.mission);
        await setClues(result.data.mission.clue);
        await setHints(result.data.hint)
    }

    const eventStatus = async() => {
        const response = await client.get('api/player/event');
        if(!response.ok){
          return;
        }
        setEventEnd(!response.data.onEvent);
    } 

      useEffect(() => {
        fetch();
        eventStatus();
      }, [props.match.params.id]);

    //   console.log(data)
 
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
    };
    // console.log(location)

    const locationBody= {
        "MissionId":props.match.params.id,
        "Location":{
            "coords":{
                "latitude":`${location.coordinates.lat}`,
                "longitude":`${location.coordinates.long}`
            }
        }
    }
      const submitAnswer = async () => {
        const result = await client.post('api/player/locationSubmission',
        locationBody)
        if(!result.ok){
          console.log(result, result.originalError, result.problem, result.status);
          console.log(result.data.message)
          setmessage(result.data.message)
          setmessageType("error")
          return;
        }
        showEvaluation(true)
        setAns(result.data.message)
        setmessage(result.data.message)
        setmessageType("error")
        // console.log(ans);
        // console.log(dataUri);
      }
    
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
    };
    
    return (       
        <React.Fragment >
            {onCam ?
            <Capture setDataUri={setDataUri} setonCam={setonCam} /> :
            <Container maxWidth="sm" style={{ height: '100vh', marginTop:"10vh" }}>
                {message && <Message message={message} show={true} type={messageType} setMessage={setmessage} />}
                <h4 style={{color:'#57CFEF',
                    fontSize:25,
                    fontFamily:'tahoma', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:12}}>
                       Mission : {data.MissionName}
                </h4>
                <p style={{color:'dark-gray',
                    fontSize:20,
                    fontFamily:'calibri',
                    display:'flex', alignItems:'center', justifyContent:'center'}}>{data.Other_Info}
                </p>
                {clues !== [] && clues.map((clue, index) => (
                <div key={index} index={index + 1}>
                <p>{clue.text}</p>
                {clue.photos && <img src={clue.photos} style={{width:300}} alt="clue" />}
                </div>
                ))}
                
                {!data.isBonus ? 
                <div>
                    <h3>Part A</h3>
                    <small>Click on icon to add your location</small>
                    <div>
                    <LocationOnIcon className={classes.icon} onClick={getLocation}/>
                    </div>
                    {!eventEnd && <Button className={classes.Button} onClick={submitAnswer}>Submit Location</Button>}
                    <hr/>
                </div>
                : ''} 
                    
                {/* {evaluation? <p>{ans}</p>: ''} */}
                <h3>Part B</h3>
                <small>Click on button to add media files</small>
                {!eventEnd && <Button className={classes.Button} href={`/user/happy-hunt/camera/${props.match.params.id}`}>Capture Media!</Button>}
                {/* {!data.isBonus ? 
                <Button className={classes.Button} onClick={submitAnswer}>Submit Location</Button>
                : ''}  */}
            
                {!data.isBonus && !eventEnd ? (<div>
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
                    {hints && <Hints id={data._id} data={hints}/>}
                </div>
                </Fade>                
                </Modal>
                </div>) :''}
                
            </Container>}
        </React.Fragment>
      );
}

const useStyles = makeStyles((theme)=>({
    task: {
      display:'flex',
      alignSelf:'center',
      justifyContent:'center',
      color:'gray',
      fontSize:16,
      fontFamily:'tahoma'
    },
    button: {
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
        color:'white',
        backgroundColor:"olive",
        fontSize:16,
        fontFamily:'tahoma'
      },
    Button:{
        color:'white', 
        fontFamily:'tahoma', 
        backgroundColor:"gray",
        margin:5
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
    },
    points: {
       float:"right",
       fontSize:16,
       fontStyle:'italic'
        
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      icon: {
        fontSize:65,
        color:"#EF7257",
        cursor:"pointer"
    }
  }));

export default PictureClues;
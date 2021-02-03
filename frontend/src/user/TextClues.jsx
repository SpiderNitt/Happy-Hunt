import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Hints from './Hints';
import { TextareaAutosize } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Routes from '../utils/routes';
import client from '../api/client';

function TextClues(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [clues,setClues] = useState([]);
    const [input, setInput]= useState('');
    const [result, setResult]= useState([]);
    const [hints, setHints]= useState([]);
    const [evaluation, showEvaluation]= useState(false);
    const [disable, setDisable]= useState(true);
    const [resultoutput, showResultoutput]= useState(false);
    const [ans, setAns]= useState("");
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

const getLocation=()=>{
    navigator.geolocation.getCurrentPosition(onSucces);
    setDisable(false)

}
// console.log(location);
// console.log(props)
    
const fetch = async () => {
        const result = await client.get(`api/mission/${props.match.params.id}`);
        // console.log(result.data);
        await setData(result.data.mission);
        await setClues(result.data.mission.clue);
        await setHints(result.data.hint)
}

    useEffect(() => {
        fetch();
    }, [props.match.params.id]);
    // console.log(data)

      const submitAnswer = async () => {
      const body= {
            "MissionId":props.match.params.id,
            "Location":{
                "coords":{
                    "latitude":`${location.coordinates.lat}`,
                    "longitude":`${location.coordinates.long}`
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

    const handleChange= (e)=>{
        setInput(e.target.value)
    }
    // console.log(input)

    
    const handleSubmit = async() => {
        console.log(input)
        const body = {
            mission: `${props.match.params.id}`,
            answer: input
        }
        console.log(body);

        const response = await client.post('api/player/submission', body)
        if(!response.ok){
          console.log(response.problem);
          console.log(response.data);
          setResult(response.data.message)
          showResultoutput(true)
          return;
        }
        setResult(response.data.message)
        console.log(result)
        showResultoutput(true)

      }

    // console.log(data)
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        
        <React.Fragment >
            
            <Container maxWidth="sm" style={{ height: '100vh', marginTop:"10vh" }}>
                <h4 style={{color:'#C866F5',
                    fontSize:25,
                    fontFamily:'tahoma', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:12}}>
                      Mission: {data.MissionName}
                </h4>
                <p style={{color:'gray',
                    fontSize:16,
                    fontFamily:'calibri',
                    display:'flex', alignItems:'center', justifyContent:'center'}}>
                        {data.Other_Info}
                </p>
                {clues !== [] && clues.map((clue, index) => (
                    <div key={index} index={index + 1}>
                    <p>{clue.text}</p>
                    {clue.photos && <img src={clue.photos} style={{width:'100%'}} alt="text-clue" />}
                    </div>
                    
                ))}
                {/* { clues[0] !== [] && <>
                    <p>{(clues[0]).text}</p>
                    {clues[0].photos && <img src={clues[0].photos} style={{width:350, height:350}}/>}
                </>}
                {clues[1] ?
                    <div>
                        <p>{(clues[1]).text}</p>
                        {clues[1].photos && <img src={clues[1].photos} style={{width:350, height:350}}/>}
                    </div> :""
                }              
                <br/><br/> */}
                <div className={classes.points}>{data.maxPoints} points</div>
                <br/><br/>
                {!data.isBonus?
                <div>
                    <LocationOnIcon className={classes.icon}  onClick={getLocation} />
                </div>
                :""}

                <p style={{fontSize:12, fontStyle: 'italic',fontFamily:'tahoma', color:"dark-gray", display:'flex', justifyContent:'center'}}>
                    note: the picture should be taken from inside the car.
                </p>
                {evaluation? <p>{ans}</p>: ''}
                <form className={classes.root} noValidate autoComplete="off">
                <TextareaAutosize style={{fontSize:15, padding:12, minHeight:20, maxWidth:300}}
                placeholder="Answer" 
                required
                value={input}
                onChange={handleChange}
                />
                </form>
                
                {resultoutput ? <div>{result}</div> : ''}
                <br/>
                <Button className={classes.Button} href={Routes.USER_CLUES}>Back to clues</Button>
                <Button className={classes.Button} onClick={handleSubmit}>Submit Answer</Button>
                {!data.isBonus ? 
                 <Button className={classes.Button} onClick={submitAnswer} disabled={disable}>Submit Location</Button>
                 : ''} 
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
                    {hints && <Hints id={data._id} data={hints}/>}
                </div>
                </Fade>                
                </Modal>
                </div>) :''}
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
        },
        },
    task: {
      display:'flex',
      alignSelf:'center',
      justifyContent:'center',
      color:'gray',
      fontSize:20,
      fontFamily:'tahoma'
    },
    task1: {
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
        color:'dark-gray',
        fontSize:18,
        fontFamily:'tahoma'
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
    },
    points: {
        float:"right", 
        fontStyle:"italic",
        fontSize: 16, 
        color:"gray",
        fontFamily:"tahoma"
    },
    button: {
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
        color:'white',
        fontSize:20,
        fontFamily:'tahoma'
    },
    Button:
      {color:'white', 
      fontFamily:'tahoma', 
      backgroundColor:"gray",
      margin:5
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

export default TextClues;
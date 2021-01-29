import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Sample3 from '../assets/sample3.jpg';
import { create } from 'apisauce';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Hints from './Hints';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Routes from '../utils/routes';
import client from '../api/client';
import Capture from './Photogragh';

const api = create({
    baseURL: 'https://api.cloudinary.com/v1_1/dqj309mtu/image',
})

function PictureClues(props) {
    const classes = useStyles();
    const [dataUri, setDataUri] = useState('');
    const [data, setData]= useState([]);
    const [imageSelected, setImageSelected] = useState("");
    const [evaluation, showEvaluation]= useState(false);
    
    const [open, setOpen] = useState(false);
    const [resultoutput, showResultoutput]= useState(false);
    const [result, setResult]= useState([]);
    const [onCam, setonCam] = useState(false);
    const [ans, setAns]= useState("");
    const [location, setLocation]= useState({
        loaded:false,
        coordinates: {lat:"", long:""}
    });
    console.log(onCam);

    const fetch = async () => {
        const result = await client.get(`api/mission/${props.match.params.id}`);
        console.log(result.data);
        setData(result.data.mission);
    }

      useEffect(() => {
        fetch();
      }, [props.match.params.id]);

      console.log(data)
    
    // const uploadImage=()=>{
    //     const formData= new FormData();
    //     formData.append("file", imageSelected);
    //     formData.append("upload_preset", "haqdfpiu");

    //     api.post ("/upload", formData)
    //     .then((response)=>{
    //         console.log(response)
    //     });
    // }

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

    }
    console.log(location);

    const body= {
        "MissionId":props.match.params.id,
        "Location":{
            "coords":{
                "latitude":`${location.coordinates.Lat}`,
                "longitude":`${location.coordinates.Long}`
            }
        }
    }
      const submitAnswer = async () => {
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

        console.log(ans);
        console.log(dataUri);
      }
     
      
    const handleSubmit = async() => {
        const body = {
            mission: `${props.match.params.id}`,
            answer: `${dataUri}`
        }
        

        const response = await client.post('api/player/submission', body)
        if(!response.ok){
          console.log(response.problem);
          console.log(response.data);
          setResult(response.data.message)
          showResultoutput(true)
          return;
        }
        setResult(response.data)
        console.log(result)
        showResultoutput(true)

      }
    
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
    };

    // if(onCam && !dataUri){
    //     return <Capture setDataUri={setDataUri} setonCam={setonCam} />;
    // }
    
    return (       
        <React.Fragment >
            {onCam ?
            <Capture setDataUri={setDataUri} setonCam={setonCam} /> :
            <Container maxWidth="sm" style={{ height: '100vh', marginTop:"10vh" }}>
                <h4 style={{color:'#57CFEF',
                    fontSize:25,
                    fontFamily:'tahoma', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:12}}>
                       Mission : {data.MissionName}
                </h4>
                <p style={{color:'dark-gray',
                    fontSize:20,
                    fontFamily:'calibri',
                    display:'flex', alignItems:'center', justifyContent:'center'}}>{data.Other_Info}</p>
                    <div style= {{display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <img src={Sample3} />
                    </div>
                <div className={classes.task}>  
                   <p>
                   {data.isBonus ? data.clue[0] : ''} 
                    </p>
                    <p className={classes.points}>{data.maxPoints}</p>
                </div>
                {dataUri && <img src={dataUri} width="250" height="250"/>}
                <div>
                    <LocationOnIcon className={classes.icon} onClick={getLocation}/>
                </div>
                {evaluation? <p>{ans}</p>: ''}
               {/* <input type="file" onChange={(e)=>{
                    setImageSelected(e.target.files[0]);
                    }
                }/>
                
                <Button type="submit" onClick={uploadImage}  style={{backgroundColor:"#4863A0", color:"whitesmoke"}}>
                    Submit
                </Button> */}
                {resultoutput?  <p>{result}</p> :''}
                <p style={{fontSize:12, fontStyle: 'italic',fontFamily:'tahoma', color:"black", display:'flex', justifyContent:'center'}}>note: the picture should be taken from inside the car.</p>
                <Button className={classes.Button} href={Routes.USER_CLUES}>Back to clues</Button>
                <Button className={classes.Button} onClick={() => setonCam(true)}>Take Picture!</Button>
                <Button className={classes.Button} onClick={handleSubmit}>Submit Picture</Button>
                <Button className={classes.Button} onClick={submitAnswer}>Submit Location</Button>
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
                    <Hints id={data._id}/>
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


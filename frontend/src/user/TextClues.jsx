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

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(onSucces);

    }, []);
    console.log(location);
    console.log(props)
    
    const fetch = async () => {
        const result = await client.get(`api/mission/${props.match.params.id}`);
        console.log(result.data);
        setData(result.data.mission);
    }

      useEffect(() => {
        fetch();
      }, [props.match.params.id]);

      console.log(data)

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
                {/* <div className={classes.task1}>
                   <p>
                    {data.clue[0]}   
                    </p>
                </div>

                <div className={classes.task}>
                   <p>
                    {data.clue[1]}    
                    </p>
                    
                </div> */}
                <div className={classes.points}>{data.maxPoints} points</div>
                <br/><br/>
                <div>
                    <LocationOnIcon className={classes.icon} />
                </div>

                <p style={{fontSize:12, fontStyle: 'italic',fontFamily:'tahoma', color:"dark-gray", display:'flex', justifyContent:'center'}}>
                    note: the picture should be taken from inside the car.
                </p>
                <form className={classes.root} noValidate autoComplete="off">
                <TextareaAutosize style={{fontSize:15, padding:12, minHeight:20, maxWidth:300}} placeholder="Answer" required/>
                </form>
                <Button className={classes.Button} href={Routes.USER_CLUES}>Back to clues</Button>
                <Button className={classes.Button}  href="/photo">Take Picture!</Button>
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
        marginLeft: 25,
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
        color:"#EF7257"
    }
    }));

export default TextClues;


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState } from "react";
import Container from '@material-ui/core/Container';
import Sample3 from '../assets/sample3.jpg';
import { create } from 'apisauce';
import { Image } from "cloudinary-react";
import  clueData  from './ClueData';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Hints from './Hints';

const api = create({
    baseURL: 'https://api.cloudinary.com/v1_1/dqj309mtu/image',
})

function PictureClues(clue, index) {
    const classes = useStyles();

    const [imageSelected, setImageSelected] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const uploadImage=()=>{
        const formData= new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "haqdfpiu");

        api.post ("/upload", formData)
        .then((response)=>{
            console.log(response)
        });
    }
    return (
        
        <React.Fragment >
            <Container maxWidth="sm" key={index} style={{ backgroundColor: '#484848', height: '100vh', marginTop:"20vh" }}>
                <h4 style={{color:'#57CFEF',
                    fontSize:25,
                    fontFamily:'tahoma', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:12}}>
                        { clueData[0].cluename}
                </h4>
                <p style={{color:'#F5F5F5',
                    fontSize:16,
                    fontFamily:'calibri',
                    display:'flex', alignItems:'center', justifyContent:'center'}}>What to do:<span>Solve the below riddle and reach the spot within 100mts to score points.</span></p>
                    <div style= {{display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <img src={Sample3} />
                    </div>
                <div className={classes.task}>
                   <p>
                    Task : Click a picture at this spot by creatively framing
                    the name using just your hands    
                    </p>
                    <p className={classes.points}>100 points</p>
                </div>

               <input type="file" onChange={(e)=>{
                    setImageSelected(e.target.files[0]);
                    }
                }/>
                {/* <Image cloudName= "dqj309mtu"
                publid= "https://res.cloudinary.com/dqj309mtu/image/upload/v1609596646/t5jbiocbudctz9hdvz0z.gif"/> */}
                <Button type="submit" onClick={uploadImage}  style={{backgroundColor:"#4863A0", color:"whitesmoke"}}>
                    Submit
                </Button>
                <p style={{fontSize:12, fontStyle: 'italic',fontFamily:'tahoma', color:"whitesmoke", display:'flex', justifyContent:'center'}}>note: the picture should be taken from inside the car.</p>
                <Button className={classes.Button} href="/clue">Back to clues</Button>
                <Button className={classes.Button} href="/photo">Take Picture!</Button>
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
                    <Hints/>
                </div>
                </Fade>
            </Modal>
                
            </Container>
        </React.Fragment>
      );
}


const useStyles = makeStyles((theme)=>({
    task: {
      display:'flex',
      alignSelf:'center',
      justifyContent:'center',
      color:'white',
      fontSize:20,
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
  }));

export default PictureClues;


import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import ReactPlayer from 'react-player/lazy';
import Button from '@material-ui/core/Button';
import client from '../api/client';
import { serialize } from 'object-to-formdata';
import { create } from "apisauce";
import axios from 'axios';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display:"flex",
    justifyContent:"center"
  },
  imgBox: {
    maxWidth: "100%",
    maxHeight: "100%",
    justifyContent: 'center',
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none"
  }
}));

const api = create({
  baseURL: 'http://localhost:3000/',
  headers:{ "Content-Type": "multipart/form-data" },
})

api.addAsyncRequestTransform(async (request) => {
  const authToken = await localStorage.getItem("token");
  if (!authToken) return;
  request.headers["token"] = authToken;
});

function Camera(props) {
  const classes = useStyles();
  const [data, setData] = useState('');
  const [response, setResponse] = useState('');
  const [disable, setDisable]=useState(true);
  const [source, setSource] = useState("");
  const [inputFile,setInputFile]= useState(null);
  const [messageType, setmessageType] = useState('');
      const fetch = async () => {
        const result = await client.get(`api/mission/${props.match.params.id}`);
        // console.log(result.data);
        await setData(result.data.mission.answer_Type);
    }

      useEffect(() => {
        fetch();
      }, [props.match.params.id]);

      // console.log(data)

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        // console.log(file);
        const newUrl = URL.createObjectURL(file);
        // console.log(newUrl);
        setSource(newUrl);
        setInputFile(file)
        setDisable(false)
      }
    }
  }
  // console.log(inputFile);
  // console.log(props)

  const handleSubmit = async() => {
    var formData = new FormData();
    formData.append('mission', props.match.params.id);
    formData.append('answer', inputFile, inputFile.name);
    console.log(formData.get("answer"));
    const response = await api.post('api/player/submission', formData)
    console.log(response)
    if(!response.ok){
      // console.log(response.problem);
      // console.log(response.data);
      setResponse(response.data.message);
      setmessageType("error");
      return;
    }
    // console.log(formData)
    setResponse(response.data.message);
    setmessageType("success");
    // console.log(response);
  }

  const mediaType =(type)=>{
    let mediatype="";
    if (type =="Picture"){
      mediatype="image/*"
    }else if(type=="Video"){
      mediatype="video/*"
    }
    return mediatype;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        {response && <Message message={response} show={true} type={messageType} setMessage={setResponse} />}
        <Grid item xs={12}>
          <h3 style={{fontFamily:"tahoma", fontWeight:"100"}}>Capture your image/video</h3>
          
          {source &&       
            <Box display="flex" justifySelf="center" border={1} className={classes.imgBox}>
              {(data=="Picture")?
               <img src={source} alt={"snap"} width={300} className={classes.img}></img>
              : <video width={300} controls>
              <source src={source} type="video/mp4" />
            </video> }
            </Box>}
          <input
            accept={mediaType(data)}
            className={classes.input}
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCameraRoundedIcon fontSize="large" color="primary" />
            </IconButton>
          </label>
          <br/>
          <Button variant="outlined" className={classes.Button} onClick={handleSubmit} disabled={disable}>Submit</Button>
          {response && <p>{response}</p>}
        </Grid>
      </Grid>
    </div>
  );
}
export default Camera;
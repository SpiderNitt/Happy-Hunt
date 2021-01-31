import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import ReactPlayer from 'react-player/lazy';
import Button from '@material-ui/core/Button';
import client from '../api/client';
import { response } from 'express';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: 'center',
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none"
  }
}));

function Camera(props) {
  const classes = useStyles();
  const [dataUri, setDataUri] = useState('');
  const [disable, setDisable]=useState(true);
  const [source, setSource] = useState("");
  const [inputFile,setInputFile]= useState(null);

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        console.log(file);
        const newUrl = URL.createObjectURL(file);
        console.log(newUrl);
        setSource(newUrl);
        setInputFile(file)
        setDisable(false)
      }
    }
  }
  console.log(inputFile);
  console.log(props)

  const handleSubmit = async() => {
    const body = {
        mission: `${props.match.params.id}`,
        answer: `${inputFile}`
    }
    
    const response = await client.post('api/player/submission', body)
    if(!response.ok){
      console.log(response.problem);
      console.log(response.data);
      return;
    }
    console.log(response)

  }
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <h5>Capture your image</h5>
          {source &&
            <Box display="flex" justifyContent="center" border={1} className={classes.imgBox}>
              <img src={source} alt={"snap"} className={classes.img}></img>
              {/* <ReactPlayer url={source} /> */}
            </Box>}
          <input
            accept="image/*"
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
          <Button className={classes.Button} onClick={handleSubmit} disabled={disable}>Submit Picture</Button>

        </Grid>
      </Grid>
    </div>
  );
}
export default Camera;
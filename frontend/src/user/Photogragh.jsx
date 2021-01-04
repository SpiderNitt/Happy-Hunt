import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES }  from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css'; 
import ImagePreview from './ImagePreview';
import { makeStyles } from '@material-ui/core/styles';     
 
function Capture (props) {
  const [dataUri, setDataUri] = useState('');
  const [disable, setDisable] = useState(true);
 
  function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    setDataUri(dataUri);
    setDisable(false);
  }
 
  const isFullscreen = true;
  const classes= useStyles();
  return (
    <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
            className={classes.preview}
          />
          : <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={isFullscreen} 
            idealFacingMode = {FACING_MODES.USER}
            isDisplayStartCameraError = {true} 
            sizeFactor = {0.65}
            idealResolution = {{width: 640, height: 480}}
          />
      }
      <p  style={{visibility: disable ? 'visible' : 'hidden' }} >Tap to capture image</p>
    </div>
  );
}

const useStyles = makeStyles({
    preview: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
  })
 
export default Capture;
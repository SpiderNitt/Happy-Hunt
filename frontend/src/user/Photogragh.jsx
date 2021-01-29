import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
 
// import ImagePreview from './ImagePreview'; 
 
function Capture (props) {
  const [dataUri, setDataUri] = useState('');
 
  function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    props.setDataUri(dataUri);
    props.setonCam(false);
  }
 
  const isFullscreen = false;
  return (
    <div>
      <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
        isFullscreen={true}
      />
      {/* {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
          />
          : <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={isFullscreen}
          />
      } */}
    </div>
  );
}

export default Capture;
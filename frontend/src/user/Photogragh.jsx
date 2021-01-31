import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
 
function Capture (props) {
  // const [dataUri, setDataUri] = useState('');
 
  async function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    const image = new Image();
    image.src = dataUri;
    console.log(image)
    props.setDataUri(dataUri);
    props.setonCam(false);
  }
 
  // const isFullscreen = false;
  return (
    <div>
      <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
        isFullscreen={true}
        idealResolution={{
          width:150,
          height:150
        }}
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
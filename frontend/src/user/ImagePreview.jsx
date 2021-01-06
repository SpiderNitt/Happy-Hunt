import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FacebookButton, FacebookCount } from "react-social";

function ImagePreview ({ dataUri})  {
  const classes= useStyles();
   const url= {dataUri}
   console.log(dataUri)
  return (
    <div className={classes.demoPreview}>
      <img src={dataUri}/>
      <br/>
      <Button className={classes.Button} href="/photo">Retry</Button>
      <Button className={classes.Button} href="/share">Share</Button>

      {/* <FacebookButton url={url} appId={415776069775389}>
        <FacebookCount url={url} />
        {" Share " + dataUri}
      </FacebookButton> */}
    </div>
    
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool
};

const useStyles = makeStyles({

    demoPreview : {
        position: 'relative',
        textAlign: 'center',
        width: 300,
    },
    Button:{
        color:'white', 
        fontFamily:'tahoma', 
        backgroundColor:"navy",
        margin:5
    },
});

export default ImagePreview;
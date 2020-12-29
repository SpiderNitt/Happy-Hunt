import React from 'react';
import SecondNavbar from './secondNav';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Timer from './Timer';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop:window.innerHeight *0.28,
    marginLeft:window.innerWidth*0.005,
    marginRight:window.innerWidth*0.005,
   
  }
}));

 function MainClues() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <SecondNavbar />
      <Timer />    
    </div>
  );
}

export default MainClues;


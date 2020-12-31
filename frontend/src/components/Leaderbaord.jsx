import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SecondNavbar from './secondNav';

const useStyles = makeStyles({
container:{
  marginTop:window.innerHeight *0.3,
  justifyContent:"center",
  width: 340,
  marginRight: "auto",
  marginLeft: "auto"
},
cards:{
  marginTop:10,
  maxWidth:440,
  backgroundColor:"grey",
  padding:17,
  borderRadius:10,
  color:"white",
  fontFamily:"Tahoma",
  fontWeight: 200
  
},

index:{
 marginRight:60,
 fontFamily:"sans-serif",
 color:"rgb(250,250,200)",
 fontWeight: 400
},
points:{
  marginLeft:60,
  fontFamily:"sans-serif"
 },

});

function Leaderboard() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SecondNavbar/>
    <ul className={classes.cards}>
      <ul>
        <p><span className={classes.index}>1st</span> Team A <span className={classes.points}>200 points</span></p>
        </ul>  
    </ul>
    <ul className={classes.cards}>
      <ul>
        <p><span className={classes.index}>2nd</span> Team Y <span className={classes.points}>180 points</span></p>
        </ul>  
    </ul>
    <ul className={classes.cards}>
      <ul>
        <p><span className={classes.index}>3rd</span> Team O <span className={classes.points}>160 points</span></p>
        </ul>  
    </ul>
    <ul className={classes.cards}>
      <ul>
        <p><span className={classes.index}>4th</span> Team I <span className={classes.points}>140 points</span></p>
        </ul>  
    </ul> 
      
    </div>
  );
}


export default Leaderboard;
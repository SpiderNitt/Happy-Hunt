import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function LocationClues(props) {
    const classes = useStyles();
    return (
        <React.Fragment >
            
            <Container maxWidth="sm" style={{ backgroundColor: '#484848', height: '100vh', marginTop:"20vh" }}>
                <h4 style={{color:'#57EFC0',
                    fontSize:25,
                    fontFamily:'tahoma', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:12}}>
                        Clue: Let's pass by!
                </h4>
                <p style={{color:'#F5F5F5',
                    fontSize:16,
                    fontFamily:'calibri',
                    display:'flex', alignItems:'center', justifyContent:'center'}}>What to do: <span style={{marginLeft:5}}> Follow the instructions as given below</span>
                </p>
                <div className={classes.task1}>
                   <p>
                    "If you got a sweet tooth, 
                     <br/>  I can tell you where to come 
                    <br/> We are here at the east street,
                    <br/> Just follow the biscuit crumbs."  
                    
                    </p>
                </div>
                <p className={classes.points}>100 points</p>
                <br/>
                <br/>
                <br/>
                <div>
                < LocationOnIcon  className={classes.icon} />
                </div>
                
                <p style={{fontSize:12, fontStyle: 'italic',fontFamily:'tahoma', color:"whitesmoke", display:'flex', justifyContent:'center'}}>
                     you haven't reached the location yet.
                </p>
                
                <Button className={classes.Button} href="/clue">Back to clues</Button>
                <Button className={classes.Button}>Take Picture!</Button>
                <Button className={classes.Button}>Hint</Button>
                
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
          margin: 10
        },
        },
    task1: {
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
        color:'whitesmoke',
        fontSize:18,
        fontFamily:'tahoma'
      },
      points: {
        float:"right", 
        fontStyle:"italic",
        fontSize: 16, 
        color:'gray',
        fontFamily:'tahoma'
    },
    button: {
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
        color:'white',
        fontSize:20,
        fontFamily:'tahoma'
      },
      Button:{
      color:'white', 
      fontFamily:'tahoma', 
      backgroundColor:"gray",
      margin:5
    },
    icon: {
        fontSize:65,
        color:"#EF7257"
    },
    }));

export default LocationClues;


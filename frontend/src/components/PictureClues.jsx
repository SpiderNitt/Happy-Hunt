import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import SecondNavbar from './secondNav';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Sample3 from '../assets/sample3.jpg';


function PictureClues(props) {
    const classes = useStyles();
    return (
        <React.Fragment >
          <SecondNavbar/>
            <Container style={{ backgroundColor: '#484848', height: '100vh', marginTop:"20vh" }}>
                <h4 style={{color:'#D3D3D3',
                    fontSize:25,
                    fontFamily:'tahoma', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:12}}>
                        Clue: Match it!!
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
                    <span>100 points</span>
                    </p>
                </div>
                <p style={{fontSize:12, fontStyle: 'italic',fontFamily:'tahoma', color:"whitesmoke", display:'flex', justifyContent:'center'}}>note: the picture should be taken from inside the car.</p>
                <button>Take Picture!</button>
                
            </Container>
        </React.Fragment>
      );
}

const useStyles = makeStyles({
    task: {
      display:'flex',
      alignSelf:'center',
      justifyContent:'center',
      color:'white',
      fontSize:20,
      fontFamily:'tahoma'
    },
  });

export default PictureClues;
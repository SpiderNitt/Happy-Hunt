import {React, useEffect, useState, createRef} from 'react';
import client from '../api/client';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip, Container, Grid } from '@material-ui/core';
import Routes from '../utils/routes';

const useStyles = makeStyles({
   title: {
     fontSize: 20,
     color:"olive",
     fontWeight: 300,
     textAlign: 'left',
     fontFamily:"tahoma"
   },
   pos: {
     marginBottom: 12,
   },
   category: {
    fontFamily:"tahoma",
    fontStyle:"italic",
    color:"gray",
    float:"left",
    marginLeft:10
  },
   points: {
     float:"right",
   },
   container: {
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: 10,
   }
 });

const RedirectUrl=(category)=>{
  let url;
  if(category=="Picture and Location"){
    url=Routes.USER_LOCATION_CLUE
  }
  else if(category=="Text"){
    url=Routes.USER_TEXT_CLUE
  }
  else if(category=="Picture" || category=="Video"){
    url=Routes.USER_PICTURE_CLUE
  }
  return url;
}

function Clues(){
  const classes= useStyles();
  const [data, setData] = useState([]);
  const fetch = async () => {
    const result = await client.get('api/player/mission')
    if(!result.ok){
      console.log(result.originalError, result.problem, result.status);
      return;
    }
    setData(result.data.missions);
  }
  useEffect(() => {
    fetch();
  }, []);

  return (   
    <Container maxWidth="md">
      {data !== [] && data.map((mission, index) => (
          <Card key={mission._id} index={index + 1} style={{ marginBottom: 10, padding: 10 }}>
       <CardContent>
         <div className={classes.container}>
           <Typography className={classes.title} color="textSecondary" variant="ul" >
             {mission.clue}
           </Typography>
           <Chip size="small" label={data.isSolved? "solved" : "unsolved" } />
         </div>
       </CardContent>
       <div className={classes.category} color="textSecondary" variant="p" >
             {mission.Category}
        </div>
        <br/><br/>
       <CardActions style={{ display: 'flex', justifyContent: 'space-between'}}>
         <Button variant="contained" size="small" href={RedirectUrl(mission.Category)}>View</Button>
         <Typography color="textSecondary">
           {mission.maxPoints}
         </Typography>
       </CardActions>
     </Card>
      ))}
      
    </Container>
  )
};

export default Clues;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clueData from './ClueData';
import { Chip, Container, Grid } from '@material-ui/core';

const RenderClues=(clue , index)=> {
   const classes= useStyles();
   
    return (
      
      <Card key={index} style={{ marginBottom: 10, padding: 10 }}>
        <CardContent>
          <div className={classes.container}>
            <Typography className={classes.title} color="textSecondary" variant="ul">
              Clue : {clue.cluename}
            </Typography>
            
            <Chip size="small" label={clue.isSolved? "solved" : "unsolved" } />
          </div>

          
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Button variant="contained" size="small" href="/photo-clue">View</Button>
          <Typography color="textSecondary">
            {clue.points}
          </Typography>
        </CardActions>
      </Card>
    );
}

function Clues() {
    return (
      <Container maxWidth="md">
        {/* <div className="grid">
            {clueData.map(RenderClues)}
        </div>  */}
        <Grid item xs={12}>
          {clueData.map(RenderClues)}
        </Grid>
      </Container>
    );
}


export default Clues;

const useStyles = makeStyles({
    title: {
      fontSize: 20,
      color:"olive",
      fontWeight: 'bold',
      textAlign: 'left',
    },
    pos: {
      marginBottom: 12,
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
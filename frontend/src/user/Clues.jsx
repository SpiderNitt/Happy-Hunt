import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clueData from './ClueData';

const RenderClues=(clue , index)=> {
   const classes= useStyles();
   
    return (
      
      <Card className={classes.root} key={index}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" variant="ul">
            Clue : {clue.cluename}
          </Typography>
          
          <Typography className={classes.pos} color="textSecondary">
            {clue.isSolved? "solved" : "unsolved" }
          </Typography>

          <Typography className={classes.points} color="textSecondary">
            {clue.points}
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button size="small" href="/photo-clue">View</Button>
        </CardActions>
      </Card>
    );
}

function Clues() {
    return (
        <div className="grid">
            {clueData.map(RenderClues)}
        </div> 
    );
}


export default Clues;

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      maxWidth: 360,
    },
    title: {
      fontSize: 20,
      color:"olive"
    },
    pos: {
      marginBottom: 12,
    },
    points: {
      float:"right",
    },
  });
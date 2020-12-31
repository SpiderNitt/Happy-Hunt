import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const clueData = [
    { cluename: "Clue 1",
      isRead : false,
      points: "100 points"

    },
    { cluename: "Clue 2",
    isRead : false,
    points: "120 points"

    },
    { cluename: "Clue 3",
    isRead : false,
    points: "140 points"

    },
    { cluename: "Clue 4",
    isRead : false,
    points: "150 points"

    }
]


const RenderClues=(clue , index)=> {
   const classes= useStyles();
    return (
      <Card className={classes.root} key={index}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" variant="ul">
            {clue.cluename}
          </Typography>
          
          <Typography className={classes.pos} color="textSecondary">
            {clue.isRead ? "read" : "unread" }
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
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
  });
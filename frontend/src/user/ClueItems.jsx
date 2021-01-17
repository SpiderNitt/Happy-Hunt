import {React, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip, Container, Grid } from '@material-ui/core';
import './Clues';

const RenderClues=(props)=> {
   const classes= useStyles();
   console.log(props.key)
   console.log(props.data)
    return (
      // <Card key={props.key}  style={{ marginBottom: 10, padding: 10 }}>
      //   <CardContent>
      //     <div className={classes.container}>
      //       <Typography className={classes.title} color="textSecondary" variant="ul" >
      //         Clue : {props.data.cluename}
      //       </Typography>
            
      //       <Chip size="small" label={props.data.isSolved? "solved" : "unsolved" } />
      //     </div>
      //   </CardContent>
      //   <CardActions style={{ display: 'flex', justifyContent: 'space-between'}}>
      //     <Button variant="contained" size="small" href="/photo-clue">View</Button>
      //     <Typography color="textSecondary">
      //       {props.data.points}
      //     </Typography>
      //   </CardActions>
      // </Card>
      <p>kk</p>
    );
}

export default RenderClues;

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
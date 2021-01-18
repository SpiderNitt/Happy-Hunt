import {React, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import client from '../api/client';
import { Chip, Container, Grid } from '@material-ui/core';
import RenderClues from './ClueItems.jsx';
 

function Clues(){
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
        const result = await client.get('api/player/mission')
        setData(result.data.missions);
    }
    fetch();
}, []);

  return ( 
    <Container maxWidth="md">
      <Grid item xs={12} >
      {data.map((mission, index) => (
          <RenderClues key={mission._id} mission={mission} index={index + 1} />
      ))}
      </Grid>
    </Container>
  );
};

export default Clues;


import {React, useEffect, useState, createRef} from 'react';
import client from '../api/client';
import { Chip, Container, Grid } from '@material-ui/core';
import RenderClues from './ClueItems.jsx';

const getData= async()=>{
  const result = await client.get('api/player/mission')
  return( 
    result.missions
  )    
}  

function Clues(){

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(getData());
  }, []);
 

  return ( 
    <Container maxWidth="md">
      <Grid item xs={12} >
        {data.map((mission, index) => {
            <RenderClues key={index} data={mission} />
        })}
      </Grid>
    </Container>
  );
};

export default Clues;



import { React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip, Container } from '@material-ui/core';
import Routes from '../utils/routes';
import LoadingPage from '../components/LoadingPage';
import client from '../api/client';

const useStyles = makeStyles({
  title: {
    fontSize: 20,
    color: "olive",
    fontWeight: 300,
    textAlign: 'left',
    fontFamily: "tahoma"
  },
  pos: {
    marginBottom: 12,
  },
  category: {
    fontFamily: "tahoma",
    fontStyle: "italic",
    color: "gray",
    float: "left",
    marginLeft: 10
  },
  points: {
    float: "right",
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
});

const RedirectUrl = (category, id) => {
  let url;
  if (category==="") {
    url = `/user/happy-hunt/location-clue/${id}`
  }
  else if (category === "Text") {
    url = `/user/happy-hunt/text-clue/${id}`
  }
  else if (category === "Picture" || category === "Video") {
    url = `/user/happy-hunt/picture-clue/${id}`
  }
  return url;
}

function Clues(props){
  const classes= useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const result = await client.get('api/player/mission')
    if(!result.ok){
      console.log(result.originalError, result.problem, result.status);
      return;
    }
    setData(result.data.missions);
    setLoading(false);
  }
  useEffect(() => {
    fetch();
  }, []);
  console.log(data)
  console.log(props)

  const RenderClues=()=>{
    return (
      <Container maxWidth="md">
        {data !== [] && data.map((mission, index) => (
        <Card key={mission._id} index={index + 1} style={{ marginBottom: 10, padding: 10 }}>
        <CardContent>
          <div className={classes.container}>
            <Typography className={classes.title} color="textSecondary" variant="ul" >
              {mission.MissionName}
            </Typography>
            <Chip size="small" label={data.isSolved? "solved" : "unsolved" } />
          </div>
        </CardContent>
        <div className={classes.category} color="textSecondary" variant="p" >
            {mission.answer_Type}
        </div>
          <br/><br/>
        <CardActions style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Button variant="contained" size="small" href={RedirectUrl(mission.answer_Type, mission._id)}>View</Button>
          <Typography color="textSecondary">
            {mission.maxPoints}
          </Typography>
        </CardActions>
        </Card>
        
      ))}
      </Container>
    )
    }

  return (   
    <Container maxWidth="md">
      {loading && <LoadingPage />}
      {!loading && <RenderClues/>} 

    </Container>
  )
};

export default Clues;
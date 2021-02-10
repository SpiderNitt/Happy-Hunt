import { React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import LoadingPage from '../components/LoadingPage';

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
  },
  heading:{
    fontWeight: '200',
    fontFamily:"tahoma",
    textDecoration:"underline",
    color:"#34495E",
    fontSize:22
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
  // const [loading, setLoading] = useState(true);
  const [data, setData] = useState(props.data.data);
  // const data = props.data.data;
  // console.log(data);
  useEffect(() => {
    setData(props.data.data);
  }, [props.data.data]);

  // console.log(props)
  const missions= data.slice(0,3);
  const bonusMissions= data.slice(3,5)

  const RenderClues=()=>{
    return (
      <Container maxWidth="md">
        <p className={classes.heading}>CLUES</p>
      
        {missions !== [] && missions.map((mission, index) => (
        mission ?  
        <>
        <Card key={mission._id} index={index + 1} style={{ marginBottom: 10, padding: 10 }}>
        <CardContent>
          <div className={classes.container}>
            <Typography className={classes.title} color="textSecondary" variant="ul" >
              {mission.MissionName}
            </Typography>
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
        </>:
        <></>
      ))}
      <br/>
      <p className={classes.heading}>BONUS CLUES</p>
      {bonusMissions !== [] && bonusMissions.map((mission, index) => (
        mission ?  
        <>
        <Card key={mission._id} index={index + 1} style={{ marginBottom: 10, padding: 10 }}>
        <CardContent>
          <div className={classes.container}>
            <Typography className={classes.title} color="textSecondary" variant="ul" >
              {mission.MissionName}
            </Typography>
           <StarOutlineIcon style={{color:"orange", fontSize:25}}/>  
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
        </>:
        <></>
      ))}
      </Container>
    )
    }

  return (   
    <Container maxWidth="md">
      <RenderClues/>
    </Container>
  )
};

export default Clues;
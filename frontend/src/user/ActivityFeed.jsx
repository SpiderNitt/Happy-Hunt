import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Avatar, CardHeader, IconButton } from '@material-ui/core';
import { Favorite, PeopleAltOutlined, Share } from '@material-ui/icons';
import client from '../api/client';
import moment from 'moment';
import LoadingPage from '../components/LoadingPage';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));


function ActivityFeed() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [likedColor, setLikedColor]= useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const result = await client.get('api/activity/feed')
      console.log(result);
      setLoading(false);
      setData(result.data.activityFeeds);
  }
    fetch();
   
}, []);
console.log(data)

const getLike= ()=>{
  setLikedColor("red")
  console.log(likedColor);
}

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {loading && <LoadingPage />}
      {!loading &&      <Grid container spacing={4}>
      {data.map((activity, index) => (
        <Grid item key={activity._id} index={index + 1} xs={12} sm={6} md={4}>
           <Card className={classes.card} item xs={3}>
                <CardHeader
                    avatar={
                    <Avatar >
                        <PeopleAltOutlined />
                    </Avatar>
                    }
                    title={"Team : " + activity.TeamName}
                    subheader= {moment(activity.Date).startOf('day').fromNow()}
                />
                <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="textSecondary" component="p">
                    #tag #tag2 #yipee 
                </Typography>
                <Typography variant="body1" color="textPrimary" component="p" style={{fontSize: 14, color:"gray", fontWeight:700 }}>
                  {"Mission : " + activity.MissionName}
                </Typography>
                </CardContent>
                <CardActions style={{display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton>
                      <Favorite onClick={getLike} style={{ color:`${likedColor}`}}/> <span style={{marginTop:3,marginLeft:5, fontSize: 18 }}>39</span>
                  </IconButton>
                  <IconButton>
                      <Share />
                  </IconButton>
                </CardActions>
            </Card>
        </Grid>
        
    ))}
      </Grid>
    }
 
         
  </Container>
  );
}

export default ActivityFeed;
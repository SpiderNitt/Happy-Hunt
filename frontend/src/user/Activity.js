import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SecondNavbar from "./secondNav";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Grid from "@material-ui/core/Grid";
import Sample1 from "../assets/sample1.jpg";
import Sample2 from "../assets/sample2.jpg";
import Sample3 from "../assets/sample3.jpg";

function Activity(props) {
  const classes = useStyles();

  return (
    <div>
      <SecondNavbar />
      <Grid
        container
        justify='space-around'
        alignItems='center'
        className={classes.container}>
        <Card className={classes.root} item xs={3}>
          <CardHeader
            avatar={
              <Avatar>
                <PeopleAltIcon />
              </Avatar>
            }
            action={
              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
                style={{ fontSize: 12, padding: 5 }}>
                25 mins ago
              </Typography>
            }
            title='Team A'
            subheader='done!! it was fun'
          />
          <CardMedia
            className={classes.media}
            square
            image={Sample2}
            title='Task1'
          />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              #tag #tag2 #tag3
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.root} item xs={3}>
          <CardHeader
            avatar={
              <Avatar>
                <PeopleAltIcon />
              </Avatar>
            }
            action={
              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
                style={{ fontSize: 12, padding: 5 }}>
                30 mins ago
              </Typography>
            }
            title='Team D'
            subheader='completed! finally'
          />
          <CardMedia className={classes.media} image={Sample1} title='Task4' />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              #tag #tag2 #taggg
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.root} item xs={3}>
          <CardHeader
            avatar={
              <Avatar>
                <PeopleAltIcon />
              </Avatar>
            }
            action={
              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
                style={{ fontSize: 12, padding: 5 }}>
                35 mins ago
              </Typography>
            }
            title='Team D'
            subheader='i dont like this'
          />
          <CardMedia className={classes.media} image={Sample3} title='Task1' />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              #tag #tag2 #yipee
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginTop: window.innerHeight * 0.07,
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: window.innerHeight * 0.22,
    marginLeft: window.innerWidth * 0.005,
    marginRight: window.innerWidth * 0.005,
    flexDirection: "column",
  },
  media: {
    height: 100,
    paddingTop: "56.25%", // 16:9
  },
}));

export default Activity;

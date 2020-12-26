import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import GroupIcon from '@material-ui/icons/Group';
import { Button } from '@material-ui/core';

import image from '../assets/toa-heftiba-7YmG3udtQl0-unsplash.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 720,
    marginBottom: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));


export default function ActivityFeedCard({ teamName, mission}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <GroupIcon />
          </Avatar>
        }
        title={teamName}
        subheader="december 25, 2020"
      />
      <CardMedia
        className={classes.media}
        image={image}
        title="image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {mission}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonGroup}>
        <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
          Accept
        </Button>
        <Button variant="contained" color="secondary" style={{ marginRight: 10 }}>
          Reject
        </Button>
      </CardActions>
    </Card>
  );
}

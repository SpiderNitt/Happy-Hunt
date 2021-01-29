import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { GroupOutlined } from '@material-ui/icons';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontWeight: 'bold',
  }
}));

export default function FeedCard({ data:activity }) {
  const [data, setData] = useState(activity);
  const classes = useStyles();

  useEffect(() => {
    setData(activity);
  }, [])

  return (
    <Card className={classes.root}>
      {data && <>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <GroupOutlined />
          </Avatar>
        }
        title={data.TeamName}
        titleTypographyProps={{
          align: 'left',
          variant: 'h6',
        }}
        subheader={moment(data.Date).fromNow()}
        subheaderTypographyProps={{
          align: 'left',
        }}
      />
      <CardMedia
        className={classes.media}
        image="https://source.unsplash.com/random"
        title={data.MissionName}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.MissionName}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
          <span>{data.likes}</span>
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </CardActions>
      </>
    }
    </Card>
  );
}

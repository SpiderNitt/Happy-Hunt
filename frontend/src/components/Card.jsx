import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { GroupOutlined } from '@material-ui/icons';
import moment from 'moment';
import ShareIcon from '@material-ui/icons/Share';
import client from '../api/client';
import WebShare from './WebShare';
import ReactPlayer from 'react-player/lazy';
import { CardMedia } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  },
  button: {
    display:"flex",
    justifyContent:"space-around"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FeedCard({ data:activity }) {
  const [data, setData] = useState(activity);
  const classes = useStyles();
  const [isLiked, setIsLiked]= useState(false);
  const [sharePost,setSharePost] = useState(false);
  const [media,setMedia] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData(activity);
    setMedia(data.Answer_type); 
  }, [])

  console.log(data)
  console.log(media)

  const likePost = async () => {
    const result = await client.get(`api/activity/feed/likes/${data._id}`)
    if(!result.ok){
      console.log(result.originalError, result.problem, result.status);
      return;
    }
    console.log(result);
    setIsLiked(true);  
  }

  console.log(media)
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
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.MissionName}
        </Typography>
      </CardContent>
      <CardMedia>

      {(media == " Video") &&
        <ReactPlayer url={`data:video/mp4;base64,${data.Answer}`} alt={"video"} /> 
      }
      {(media == " Picture") &&
        <img src={data.Answer} alt={"picture"} />
      }
      </CardMedia>
      
      <div className={classes.button}>
        <CardActions>  
          <IconButton>
            <FavoriteIcon onClick={likePost} color={isLiked ? "secondary" : "disabled"} />
            <span>{data.likes}</span>
          </IconButton>
          <IconButton>
            <ShareIcon onClick={handleOpen}></ShareIcon>
          </IconButton>
        </CardActions>
      </div>
      </>
    }
    {open?(
      <WebShare data={data}/>):(<></>)}
    </Card>
  );
}
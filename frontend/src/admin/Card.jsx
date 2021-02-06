import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import GroupIcon from "@material-ui/icons/Group";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import client from "../api/client";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 720,
    marginBottom: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

export default function ActivityFeedCard(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAccept = (isAccepted, activityfeedId) => {
    console.log(isAccepted, activityfeedId);
    const object = {
      isAccepted,
      activityfeedId,
    };
    //route for accepting
    const response = client.post("api/admin/accept", object);
    console.log(response);
  };
  const handleReject = () => {
    handleOpen();
  };
  const handleRejectConfirm = (isAccepted, activityfeedId) => {
    console.log(isAccepted, activityfeedId);
    //route for rejecting
    const object = {
      isAccepted,
      activityfeedId,
    };
    const response = client.post("api/admin/accept", object);
    console.log(response);
    handleClose();
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <GroupIcon />
          </Avatar>
        }
        title={`Team id: ${props.data.team.teamName}`}
        subheader={props.data.Date}
      />
      <CardMedia
        className={classes.media}
        image={props.data.Answer}
        title='image'
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {`Mission id: ${props.data.mission.MissionName}`}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonGroup}>
        <Button
          variant='contained'
          color='primary'
          style={{ marginRight: 10 }}
          onClick={() => handleAccept(true, props.data["_id"])}>
          Accept
        </Button>
        <Button
          variant='contained'
          color='secondary'
          style={{ marginRight: 10 }}
          onClick={handleReject}>
          Reject
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>
            {"REJECT SUBMISSION"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to reject this submission ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary' autoFocus>
              NO
            </Button>
            <Button
              onClick={() => handleRejectConfirm(false, props.data["_id"])}
              color='secondary'
              variant='contained'
              autoFocus>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}

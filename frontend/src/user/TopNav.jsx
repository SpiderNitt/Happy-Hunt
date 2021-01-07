import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Home } from '@material-ui/icons';
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

  title: {
    flexGrow: 1,
    fontWeight: 800,
    color: "#95B9C7"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  paper: {
    backgroundColor: "#505050",
    border: 0,
   
  },
  button: {
    color:"white",
    fontFamily:"tahoma",
    fontSize: 15,
    padding:20
   
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Happy Hunt
          </Typography>
          <Button onClick={handleOpen} color="inherit">
            <HomeIcon />
          </Button>
        </Toolbar>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Button href="/" className={classes.button}>Logout</Button>
              <Button href="/home" className={classes.button}>Exit Game</Button>
            </div>
          </Fade>
        </Modal>
      </AppBar>
    </div>
  );
}


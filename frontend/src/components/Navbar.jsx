import {
    AppBar,
    makeStyles,
    Button,
  } from "@material-ui/core";
 
  import React from "react";
  import Modal from '@material-ui/core/Modal';
  import Backdrop from '@material-ui/core/Backdrop';
  import Fade from '@material-ui/core/Fade';
  import HomeIcon from '@material-ui/icons/Home';

  const useStyles = makeStyles((theme) => ({
    header: {
      height:64,
      display:"flex",
      justifyContent: "space-around",
      backgroundColor: "#000080",
      "@media (max-width: 300px)": {
      }
    }, 
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: "#C0C0C0",
      border: 0,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

 
  function Navbar(props) {
    const classes= useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
    <AppBar className={classes.header}>
      <h2>Happy Hunt</h2>
      <div onClick={handleOpen}>
        <HomeIcon/>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Button href="/logout">Logout</Button>
            <Button href="/main">Resume</Button>
          </div>
        </Fade>
      </Modal>
    </AppBar>
 
    );
  }
  export default Navbar;
import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rules from './Rules';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Routes from '../utils/routes';

const useStyles = makeStyles((theme) => ({
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
  welcome: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));


function Home(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        <div className={classes.welcome}>
            <h1>Welcome!</h1>
            <div>
          <h3>Happy Hunt Challenge</h3>
            {/* <Button href="/register" variant="outlined" color="secondary">Register</Button> */}
         
            <Button variant="outlined" color="secondary" onClick={handleOpen}>start</Button>
            <br/>
            <br/>
             {/* this will show a video */}
             <Button style={{margin:25}}>
              <PlayCircleFilledIcon style={{fontSize:60, color:"#F96377"}}/>
            </Button>
            <p style={{margin:5, fontFamily:"tahoma", fontStyle:"italic", color:"gray"}}>How to play?</p>
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
            <Rules/>
            <Button variant="contained" color="primary" href={Routes.USER_CLUES} style={{margin:5}}>
                Start Game !
            </Button>
            
          </div>
        </Fade>
      </Modal>
    </div>
    </div>
    );
}

export default Home;
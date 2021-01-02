import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';



export default function AlertMessage({ message, setInfo }) {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setState({open: false, ...state});
    setInfo('');
  };

  return (
    <Snackbar 
    anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }} 
    open={state.open} 
    message={message}
    autoHideDuration={5000}
    action={
    <React.Fragment>
        <IconButton size="small" color="inherit" onClick={handleClose}>
        <Close fontSize="small" />
        </IconButton>
    </React.Fragment>
    }
    onClose={handleClose} />
  );
}

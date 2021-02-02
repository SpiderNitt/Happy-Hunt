import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Email, Facebook, Instagram, Phone, Twitter } from '@material-ui/icons';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://www.hhc.eventspeciale.com/">
        eventspeciale
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
    <Container maxWidth="xl" fixed>
        <Typography variant="h5">Happy Hunt challenge</Typography>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Email /><span>&nbsp;info@eventspeciale.com</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Phone /><span>&nbsp;020 26 855 0000</span>
        </div> 
        <Typography variant="body1">privacy policy</Typography>
        <Facebook />
        <Twitter />
        <Instagram />
        <Copyright />
    </Container>
    </footer>
  );
}
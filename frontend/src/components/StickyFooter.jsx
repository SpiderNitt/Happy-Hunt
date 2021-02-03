import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Email, Facebook, Instagram, Phone, Twitter, YouTube } from '@material-ui/icons';
import '../CSS/style.css';
import { Divider } from '@material-ui/core';

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


export default function StickyFooter() {
  return (
    <footer className="footer">
      <Divider variant="fullWidth" />
      <p>About</p>
      <p>Terms of use</p>
      <p>Privacy policy</p>
      <p>Refund Policy</p>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Email /><p>&nbsp;info@eventspeciale.com</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Phone /><p>&nbsp;020 26 855 0000</p>
      </div> 
      <Facebook />&nbsp;
      <Twitter />&nbsp;
      <Instagram />&nbsp;
      <YouTube />&nbsp;
      <Copyright />
    </footer>
  );
}
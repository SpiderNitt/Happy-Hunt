import { Box, Container, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Routes from '../utils/routes';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.hhc.eventspeciale.com/">
          HHC
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
}));

const footers = [
    {
      title: 'Company',
      description: [
        ['About us', Routes.ABOUT_US], 
        ['Contact us:', '#'], 
        ['info@eventspeciale.com', '#'], 
        ['eventspeciale.com', 'https://www.eventspeciale.com/'],
      ],
    },
    // {
    //   title: 'Features',
    //   description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    // },
    // {
    //   title: 'Resources',
    //   description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    // },
    {
      title: 'Legal',
      description: [
        ['Privacy policy', Routes.PRIVACY_POLICY], 
        ['Terms of use', Routes.TERMS_OF_USE], 
        ['Rules and regulations', Routes.RULES]
      ],
    },
];



function Footer(props) {
    const classes = useStyles();
    return (
      <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid container spacing={4} justify="space-evenly">
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item[0]}>
                  <Link href={item[1]}variant="subtitle1" color="textSecondary">
                    {item[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    );
}

export default Footer;
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Search, BarChart, ShowChart, Notifications } from '@material-ui/icons';

import Clues from '../user/Clues';
import Notification from '../user/Notifications';
import Leaderboard from './Leaderbaord';
import ActivityFeed from './ActivityFeed';

function NavBar(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={index}
      style={{display: 'flex', flexGrow: 1}}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

NavBar.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: index,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    position: 'relative'
  },
}));

export default function TabNavigation() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab {...a11yProps(0)} icon={<Search />} />
          <Tab {...a11yProps(1)} icon={<ShowChart />} />
          <Tab {...a11yProps(2)} icon={<BarChart />} />
          <Tab {...a11yProps(3)} icon={<Notifications />} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <NavBar value={value} index={0} dir={theme.direction}>
          <Clues />
        </NavBar>
        <NavBar value={value} index={1} dir={theme.direction}>
          <ActivityFeed />
        </NavBar>
        <NavBar value={value} index={2} dir={theme.direction}>
          <Leaderboard />
        </NavBar>
        <NavBar value={value} index={3} dir={theme.direction}>
          <Notification />
        </NavBar>
      </SwipeableViews>
    </div>
  );
}

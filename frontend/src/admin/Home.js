import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { NotificationsActive, ChatBubble } from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import Fab from "@material-ui/core/Fab";
import Mission from "./Mission";
import Activity from "./Activity";
import ScoreBoard from "./ScoreBoard";

import "./admin.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const logOutFunction = () => {
    console.log("User has logged out");
  };
  return (
    <div>
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs
            variant='fullWidth'
            value={value}
            onChange={handleChange}
            aria-label='nav tabs'>
            <LinkTab label='Mission' href='/missions' {...a11yProps(0)} />
            <LinkTab label='Activity' href='/activity' {...a11yProps(1)} />
            <LinkTab label='Score Board' href='/scoreboard' {...a11yProps(2)} />
            <Tab label='Logout' onClick={logOutFunction} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Mission />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Activity />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ScoreBoard />
        </TabPanel>
      </div>
      <div className='bottom-right'>
        <div>
          <Fab color='primary'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsActive fontSize='large' />
            </Badge>
          </Fab>
        </div>
        <div>
          <Fab color='primary'>
            <Badge badgeContent={2} color='secondary'>
              <ChatBubble fontSize='large' />
            </Badge>
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { BarChart } from '@material-ui/icons';
import GpsFixedOutlinedIcon from '@material-ui/icons/GpsFixedOutlined';
import { Link } from 'react-router-dom';
import Routes from '../utils/routes';
import { AppBar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    // top: 'auto',
    // bottom: 0,
  },
}));

export default function NavBar({ select }) {
  const [value, setValue] = React.useState(select);
  const styles = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper square>
      {/* <AppBar className={styles.appBar} color="dodgerBlue"> */}
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
        variant="fullWidth"
      >
        <Tab icon={<GpsFixedOutlinedIcon style={{fontSize:30}}/>} component={Link} to={Routes.USER_CLUES} value="clue" />
        <Tab icon={<HomeOutlinedIcon style={{fontSize:30}}/>} component={Link} value="activity" to={Routes.USER_ACTIVITY} />
        <Tab icon={<BarChart style={{fontSize:30}}/>} component={Link} value="scoreboard" to={Routes.USER_LEADERBOARD} />
      </Tabs>
      {/* </AppBar> */}
    </Paper>
  );
}

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BarChart, Notifications, Search, ShowChart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Routes from '../utils/routes';

export default function NavBar({ select }) {
  const [value, setValue] = React.useState(select);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="fullWidth"
      >
        <Tab icon={<Search />} component={Link} to={Routes.USER_CLUES} value="clue" />
        <Tab icon={<ShowChart />} component={Link} value="activity" to={Routes.USER_ACTIVITY} />
        <Tab icon={<BarChart />} component={Link} value="scoreboard" to={Routes.USER_LEADERBOARD} />
        <Tab icon={<Notifications />} component={Link} value="notification" to={'/notification'} />
      </Tabs>
    </Paper>
  );
}

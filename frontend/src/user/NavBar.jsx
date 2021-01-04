import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BarChart, Notifications, Search, ShowChart } from '@material-ui/icons';
import { Link } from 'react-router-dom';

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
        <Tab icon={<Search />} component={Link} to={'/clue'} value="clue" />
        <Tab icon={<ShowChart />} component={Link} value="activity" to={'/activity'} />
        <Tab icon={<BarChart />} component={Link} value="scoreboard" to={'/scoreboard'} />
        <Tab icon={<Notifications />} component={Link} value="notification" to={'/notification'} />
      </Tabs>
    </Paper>
  );
}

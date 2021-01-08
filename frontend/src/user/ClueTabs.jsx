import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Lock, LockOpen } from '@material-ui/icons';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
      marginTop: 5,
  },
});

export default function ClueTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab icon={<LockOpen />} />
        <Tab icon={<Lock />} disabled />
        <Tab icon={<Lock />} disabled />
      </Tabs>
    </Container>
  );
}

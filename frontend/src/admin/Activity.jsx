import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ActivityFeedCard from "./Card";
import client from '../api/client';

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "column",
    alignContent: "center",
    marginTop: 70,
  },
}));

const Activity = () => {
  const styles = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.get('api/admin/submissions');
      console.log(result.data);
    }
    fetchData();
  })
  return (
    <Grid container className={styles.container}>
      <Grid item>
        <ActivityFeedCard teamName='team1' mission='mission1' />
      </Grid>
      <Grid item>
        <ActivityFeedCard teamName='team2' mission='mission2' />
      </Grid>
    </Grid>
  );
};

export default Activity;

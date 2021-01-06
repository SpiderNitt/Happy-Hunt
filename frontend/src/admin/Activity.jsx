import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import ActivityFeedCard from "./Card";

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "column",
    alignContent: "center",
  },
}));

const Activity = () => {
  const styles = useStyles();
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

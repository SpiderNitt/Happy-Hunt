import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ActivityFeedCard from "./Card";
import client from '../api/client';

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "column",
    alignContent: "center",
    marginTop: 80,
  },
}));

const Activity = () => {
  const styles = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.get('api/admin/submissions');
      setData(result.data.submissions);
    }
    fetchData();
  }, [data]);
  return (
    <Grid container className={styles.container}>
      {
        data.length > 0 && data.map(submission => (
          <Grid item>
            <ActivityFeedCard data={submission} />
          </Grid>
        ))
      }
      {
        data.length === 0 && <div>No submissions made</div>
      }
    </Grid>
  );
};

export default Activity;

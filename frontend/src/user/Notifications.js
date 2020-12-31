import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SecondNavbar from "./secondNav";

function Notifications(props) {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <SecondNavbar />
      <h2>notifications</h2>
    </div>
  );
}

const useStyles = makeStyles({
  main: {
    margin: 200,
  },
});

export default Notifications;

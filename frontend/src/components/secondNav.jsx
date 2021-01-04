import {
    AppBar,
    Toolbar,
    makeStyles,
    Button,
  } from "@material-ui/core";
  import React, { useState, useEffect } from "react";
  import { Link as RouterLink } from "react-router-dom";
  import SearchIcon from '@material-ui/icons/Search';
  import BarChartIcon from '@material-ui/icons/BarChart';
  import ShowChartIcon from '@material-ui/icons/ShowChart';
  import NotificationsIcon from '@material-ui/icons/NotificationsActive';
  
  const navData = [
    {
      label: <SearchIcon style={{fontSize:30, padding:10}} />,
      title: "Clues",
      href: "/main",
    },
    {
        label: <ShowChartIcon style={{fontSize:30, padding:10}}/>,
        title: "Activity",
        href: "/activity",
    },
    {
        label:  <BarChartIcon style={{fontSize:30, padding:10}}/>,
        title: "Leaderboard",
        href: "/leaderboard",
    },
    {
        label:  <NotificationsIcon style={{fontSize:30, padding:10}}/>,
        title: "Notifications",
        href: "/notifications",
    }
  ];
  
  const useStyles = makeStyles(() => ({
    header: {
      marginTop: 65,
      backgroundColor: "#778899",
      "@media (max-width: 500px)": {
      },
    }, 
    toolbar: {
        justifyContent:"space-around",
        display:"flex",
    }
  }));
  
   function SecondNavbar() {
    const { header,toolbar } = useStyles();
  
    const [state, setState] = useState({
      mobileView: false,
    });
  
    const { mobileView} = state;
  
    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 360
          ? setState( {mobileView: true })
          : setState( {mobileView: false});
      };
      setResponsiveness();
      window.addEventListener("resize", () => setResponsiveness());
    }, []);
  
    const displayDesktop = () => {
      return (
        <Toolbar className={toolbar}>
          <div>{getMenuDesktop()}</div>
        </Toolbar>
      );
    };
  
    const displayMobile = () => {
      return (
        <Toolbar className={toolbar}>
          <div>{getMenuButtons()}</div>
        </Toolbar>
      );
    
    };
  
    const getMenuButtons = () => {
      return navData.map(({ label, href }) => {
        return (
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
            }}
          >
            {label}
          </Button>
        );
      });
    };

    const getMenuDesktop = () => {
      return navData.map(({ title , href }) => {
        return (
          <Button
            {...{
              key: title,
              color: "inherit",
              to: href,
              component: RouterLink,
            }}
          >
            {title}
          </Button>
        );
      });
    };
  
    return (

    <AppBar className={header}>
      {mobileView ? displayMobile() : displayDesktop()}
    </AppBar>
 
    );
  }

  export default SecondNavbar;
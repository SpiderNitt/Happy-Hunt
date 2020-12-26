import {
    AppBar,
    Toolbar,
    makeStyles,
    Button,
    IconButton,
    Menu,
    Link,
    MenuItem,
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import React, { useState, useEffect } from "react";
  import { Link as RouterLink } from "react-router-dom";
  import HomeIcon from '@material-ui/icons/Home';
  import Typography from '@material-ui/core/Typography';

  const navData = [
    {
      label: <HomeIcon/>,
      href: "/",
    }
  ];

  
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "#000080",
      "@media (max-width: 800px)": {
      },
    }, 
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
    },
    toolbar: {
      display:"flex",
      justifyContent:"space-between"
    },
    menuBox: {
      padding: "10px 10px",
    },
    timer: {
      color:"white",
    },
  }));
  
  function Navbar(props) {
    const { header,  menuButton, toolbar, menuBox } = useStyles();
    const classes = useStyles();
    const [state, setState] = useState({
      mobileView: false,
      menuopen: false,
    });

    const [time, setTime] = useState({
      h:0, m:0 , sec:0
    })

    var updatedSec= time.sec, updatedM= time.m, updatedH= time.h;

    const runTimer=()=>{
      if(updatedM==60){
        updatedH++;
        updatedM=0
      }if(updatedSec==60){
        updatedM++;
        updatedSec=0
      }
      updatedSec++

      return setTime({
        h:updatedH, m:updatedM , sec:updatedSec
      })
    }

    const run=()=>{
      runTimer();
      setInterval(runTimer, 1000)
    }
    const { mobileView, menuopen } = state;
  
    useEffect(() => {
      
      const setResponsiveness = () => {
        return window.innerWidth < 400
          ? setState((prevState) => ({ ...prevState, mobileView: true }))
          : setState((prevState) => ({ ...prevState, mobileView: false }));
      };
  
      setResponsiveness();
  
      window.addEventListener("resize", () => setResponsiveness());
    }, []);
  
    const displayDesktop = () => {
      return (
        <div>
          <Toolbar className={classes.toolbar} >
            <h2> Happy hunt </h2>
            <Typography variant="span" className={classes.timer}>
              {(time.h)>= 10? time.h:"0" + time.h} : {(time.m)>= 10? time.m:"0" + time.m} : {(time.sec)>= 10? time.sec:"0" + time.sec}
            </Typography>
            <div>{getMenuButtons()}</div>
          </Toolbar>
          <Button variant="contained" color="primary"  onClick={run} style={{margin:5}} >
           start hunt !
          </Button>
        </div>
      );
    };
  
    const displayMobile = () => {
      const handleMenuOpen = () =>
        setState((prevState) => ({ ...prevState, menuopen: true }));
      const handleMenuClose = () =>
        setState((prevState) => ({ ...prevState, menuopen: false }));
  
    return (
        <Toolbar>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleMenuOpen,
            }}
          >
           <MenuIcon />
          </IconButton>
            <Typography variant="span" className={classes.timer}>
              {(time.h)>= 10? time.h:"0" + time.h} : {(time.m)>= 10? time.m:"0" + time.m} : {(time.sec)>= 10? time.sec:"0" + time.sec}
            </Typography>
          <Menu
             {...{
                open: menuopen,
                onClose: handleMenuClose,
              }}
            >
            <div className={menuBox}>{getMenuData()}</div>
         </Menu>
        </Toolbar>
      );
    };
  
    const getMenuData = () => {
      return navData.map(({ label, href }) => {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
      });
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
              className: menuButton,
            }}
          >
            {label}
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
  export default Navbar;
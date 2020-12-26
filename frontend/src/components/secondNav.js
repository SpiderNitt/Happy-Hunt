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
  import SearchIcon from '@material-ui/icons/Search';
  import BarChartIcon from '@material-ui/icons/BarChart';
  import ShowChartIcon from '@material-ui/icons/ShowChart';
  import NotificationsIcon from '@material-ui/icons/NotificationsActive';
  
  const navData = [
    {
      label: <SearchIcon style={{fontSize:35, padding:15}} />,
      href: "/main",
    },
    {
        label: <ShowChartIcon style={{fontSize:35, padding:15}}/> ,
        href: "/activity",
    },
    {
        label:  <BarChartIcon style={{fontSize:35, padding:15}}/>,
        href: "/leaderboard",
    },
    {
        label:  <NotificationsIcon style={{fontSize:35, padding:15}}/>,
        href: "/notifications",
    }
  ];
  
  const useStyles = makeStyles(() => ({
    header: {
      marginTop: window.innerHeight*0.17,
      backgroundColor: "#778899",
      "@media (max-width: 500px)": {
      },
    }, 
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600,
      size: "20px",
    },
    toolbar: {
        justifyContent:"space-around",
        display:"flex",
    },
    menuBox: {
      padding: "10px 10px",
    },
  }));
  
   function SecondNavbar() {
    const { header,  menuButton, toolbar, menuBox } = useStyles();
  
    const [state, setState] = useState({
      mobileView: false,
      menuopen: false,
    });
  
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
        <Toolbar className={toolbar}>
          <div>{getMenuButtons()}</div>
        </Toolbar>
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
              style: { textDecoration: "none"},
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

  export default SecondNavbar;
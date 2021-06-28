import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import useStyles from './styles';
import logoSmall from '../images/logoSmall.png';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // const [userRole, setUserRole] = useState('annotater');
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); 
    const [currentPath, setCurrentPath] = useState(location.pathname);

    const open = Boolean(anchorEl);

    useEffect(() => {
      setCurrentPath(location.pathname);
    },[location.pathname])

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      setUser(null);

      dispatch({type: 'LOGOUT'});

      history.replace('/');

      setUser(null);
    }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="white" style={{maxHeight: '8vh'}}>
        <Toolbar>
          <div className={classes.logoContainer}>
            <img src={logoSmall} alt="logo" className={classes.logo} />
          </div>
          <div className={classes.buttonContainer}>
            { user?.role === 'annotater' ? 
              <div>
                <Button color="primary" onClick={() => {history.push('/annotater')}}>
                  <Typography className={`${classes.navigationLink} ${classes.h6}`} gutterBottom>
                      { currentPath==="/annotater" ? <b>Home</b> : "Home" }
                  </Typography>
                </Button>
                <Button color="primary" onClick={() => {history.push('/annotater/task')}}>
                  <Typography className={`${classes.navigationLink} ${classes.h6}`} gutterBottom>
                    { currentPath ==="/annotater/task" ? <b>Task</b> : "Task" }
                  </Typography>
                </Button>
                <Button color="primary" onClick={() => {history.push('/annotater/my-annotation')}} >
                  <Typography className={`${classes.navigationLink} ${classes.h6}`} gutterBottom>
                    { currentPath === "/annotater/my-annotation" ? <b>My Annotation</b> : "My Annotation" }
                  </Typography>
                </Button>
              </div>
              : null
            }
          </div>
          <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default Navbar;
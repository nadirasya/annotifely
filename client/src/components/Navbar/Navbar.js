import React, { useState } from 'react';
import { AppBar, Typography, Toolbar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import useStyles from './styles';
import logoSmall from '../images/logoSmall.png';

const Navbar = () => {
    const classes = useStyles();
    const [userRole, setUserRole] = useState('annotater');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <div className={classes.logoContainer}>
            <img src={logoSmall} alt="logo" className={classes.logo} />
          </div>
          <div className={classes.buttonContainer}>
            { userRole === 'annotater' ? 
              <div>
                <Button color="primary">
                  <Typography variant="h6" className={classes.navigationLink}>
                      Home
                  </Typography>
                </Button>
                <Button color="primary">
                  <Typography variant="h6" className={classes.navigationLink}>
                      Task
                  </Typography>
                </Button>
                <Button color="primary">
                  <Typography variant="h6" className={classes.navigationLink}>
                      My Annotation
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default Navbar;
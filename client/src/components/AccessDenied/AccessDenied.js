import { Container, Box, Typography } from '@material-ui/core';
import React from 'react';

import makeStyles from './styles';
import Security from '../images/security.png'

const AccessDenied = () => {
    const classes = makeStyles();

    return (
        <Container className={classes.container}>
            <Box component="span" m={0} className={`${classes.centerBox} ${classes.box}`} style={{marginTop:'15vh'}}>
                <img src={Security} alt="" width='35%' />
            </Box>
            <Box component="span" m={0} className={`${classes.centerBox} ${classes.box}`}>
                <Typography variant="h2"><b>Sorry</b></Typography>
            </Box>
            <Box component="span" m={0} className={`${classes.centerBox} ${classes.box}`}>
                <Typography variant="h6"><b>You don't have permission to access this page</b></Typography>
            </Box>
        </Container>
    );

}

export default AccessDenied;
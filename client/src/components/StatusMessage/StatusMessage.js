import { Typography, Paper, Button, Grid, Box, Zoom } from '@material-ui/core';
import React from 'react';

import makeStyles from './styles';

// use props 'message' for showing the message
// use props event handler for handling event on 'Ok' Button
// use props 'statusMessage' (true or false value to show/hide popup)' for activating transition

const StatusMessage = ({message, handleClickOk, statusMessage}) => {
    const classes = makeStyles();

    return (
        <Zoom in={statusMessage}>
        <Paper className={classes.paper} elevation={3}>
            <div maxwidth='90vw'>
                <div className={classes.messageContainer}>
                <Box component="span" m={0} className={`${classes.centerBox} ${classes.box}`} >
                <Button disabled>
                    <Typography variant="h6" className={classes.message}><b>{message}</b></Typography>
                </Button>
                </Box>
                </div>

                <div>
                <Grid container spacing={1} className={classes.gridContainer}>
                    <Grid item xs={6}>
                        <div className={classes.buttonContainer}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={handleClickOk}>
                                <Typography variant="subtitle2" >
                                    <b>Ok</b>
                                </Typography>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                </div>
            </div>
        </Paper>
        </Zoom>
    )
}

export default StatusMessage;
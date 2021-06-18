import { Typography, Paper, Button, Grid, Box, Tooltip, Slide } from '@material-ui/core';
import React from 'react';

import makeStyles from './styles';
import cancel from '../images/delete.png'


const FeedbackForm = ({handleClickCancel, feedback, feedbackForm}) => {
    const classes = makeStyles();

    return (
        <Slide in={feedbackForm} direction="down" mountOnEnter unmountOnExit>
        <Paper className={classes.paper} elevation={3}>
            <div maxWidth='90vw'>
                <Box component="span" className={`${classes.rightBox} ${classes.boxIcon}`}>
                    <Tooltip title="Close">
                        <Button onClick={handleClickCancel}><img src={cancel} alt="" width="50%" /></Button>
                    </Tooltip>
                </Box>

                <Typography variant="h4"><b>Review</b></Typography>

                <div style={{marginTop: '2vh'}}>
                    <Typography variant="h6"><b>Score</b></Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <Box component="span" m={0} className={`${classes.centerBox} ${classes.boxScore}`} >
                                <Typography variant="h5" color="primary">
                                    <b>80</b>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box component="span" m={0} className={`${classes.leftBox} ${classes.box}`} >
                                <Typography variant="h5">
                                    <b>/ 100</b>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>

                <div style={{marginTop: '2vh'}}>
                    <Typography variant="h6"><b>Feedback</b></Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                        <Box component="span" m={0} className={`${classes.centerBox} ${classes.boxComment}`}>
                                <Typography variant="body1" >
                                    {feedback}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Paper>
        </Slide>
    );
}

export default FeedbackForm;
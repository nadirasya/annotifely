import { Typography, Paper, Button, Grid, Box, Slide } from '@material-ui/core';
import React, {useState} from 'react';

import makeStyles from './styles';
import Input from './input';

// use props 'taskTitle' for showing the title of task


const AddAdditionalTime = ({taskTitle, handleClickCancel, handleClickConfirm, additionalTimeForm}) => {
    const classes = makeStyles();
    const [time, setTime] = useState();

    const handleChange = (e) => {
        setTime(e.target.value)
        // handleClickConfirm(e.target.value)
    }

    return (
        <Slide in={additionalTimeForm} direction="down" mountOnEnter unmountOnExit >
            <Paper className={classes.paper} elevation={3}>
                <div maxWidth='90vw'>
                    <div className={classes.messageContainer}>
                        <Box component="span" m={0} className={`${classes.centerBox} ${classes.box}`} style={{height: ''}}>
                            <Button disabled>
                                <Typography variant="h5" className={classes.message}><b>{taskTitle}</b></Typography>
                            </Button>
                        </Box>
                    </div>

                    <div className={classes.messageContainer}>
                        <Box component="span" m={0} className={`${classes.centerBox} ${classes.box}`} style={{height: ''}}>
                            <Typography variant="subtitle1" className={classes.message}><b>Add Additional Time</b></Typography>
                        </Box>
                    </div>

                    <div>
                        <Grid container spacing={2}  className={classes.gridContainer}>
                            <Grid item xs={12} >
                                <Box component="span" m={0} className={`${classes.centerBox} ${classes.boxTextField}`}>
                                    <Input
                                        handleChange={handleChange}
                                        type="number"
                                        label="Timespan"
                                        name="task-timespan"
                                        InputProps={{ inputProps: { min: 1 } }}
                                    />
                                    <Typography className={classes.days} component="h1" variant="subtitle1"><b>Days</b></Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Grid container spacing={1} className={classes.gridContainer}>
                            <Grid item xs={6}>
                                <div className={classes.buttonContainer}>
                                    <Button variant="contained" color="primary" className={classes.button} onClick={() => handleClickConfirm(time)}>
                                        <Typography variant="subtitle2" >
                                            <b>Confirm</b>
                                        </Typography>
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className={classes.buttonContainer}>
                                    <Button variant="contained" color="grey" className={classes.button} onClick={handleClickCancel}>
                                        <Typography variant="subtitle2" >
                                            <b>Cancel</b>
                                        </Typography>
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Paper>
        </Slide>
    )
}

export default AddAdditionalTime;
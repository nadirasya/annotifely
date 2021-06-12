import React, { useContext, useState } from 'react';
import { Card, Button, GridListTileBar, CssBaseline, TextField, Grid, Typography, Container, Box, CardContent, ButtonBase } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTask } from '../../actions/task';
import Input from './Input';
import useStyles from './styles';

const initialState = { UrlImage: '', title: '', label: '', instruction: '', timespan: ''};

const TaskForm= () => {

    const [taskData, setTaskData] = useState(initialState);
    const [picture, setPicture] = useState(null);
    const [pictureError, setPictureError] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTask(taskData, history)); 
    };

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name] : e.target.value });
    };

    function checkIfImageExists(url, callback) {
        const img = new Image();
        
        img.src = url;
        
        if (img.complete) {
          callback(true);
        } else {
          img.onload = () => {
            callback(true);
          };
          img.onerror = () => {
            callback(false);
          };
        }
      }

    const onChangePicture = e => {
        setTaskData({ ...taskData, [e.target.name] : e.target.value });
        if (e.target.value) {
            checkIfImageExists(e.target.value, (exists) => {
                if (exists) {
                    setPictureError(false);
                    setPicture(e.target.value);
                } else {
                    setPictureError(true);
                }
              });
        } else {
            setPicture(null);
            setPictureError(false);
        }
    };

    

    return (
        // <Container maxWidth="lg">
        <div className={classes.paper}>
            <Typography variant="h4"><b>Add New Task</b></Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
                <Box>
                <Typography variant="h6" className={classes.label} htmlFor="form-image">Image URL</Typography>
                    <Input
                        handleChange={onChangePicture}
                        type="text"
                        label="Image URL"
                        name="UrlImage"
                    />
                <Grid item >
                    {picture ? 
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} src={picture} justify="center"/>
                    </ButtonBase>
                    : 
                    <Grid item xs={12} sm={12} className={classes.imagePreview}>
                        
                        <Typography variant="h6" style={{color: '#CFCFCF'}}>
                            {pictureError === true ? "Image Not Found" : "Image Preview"}
                        </Typography>
                    </Grid>
                    }
                </Grid>
                </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Grid container direction="column" justify="space-between" spacing={2}>
                    <Grid item xs>
                        <Typography variant="h6" className={classes.label} htmlFor="form-task">Task title</Typography>
                            <Input
                                handleChange={handleChange}
                                type="text"
                                label="Title"
                                name="title"
                            />
                        <Typography variant="h6" className={classes.label} htmlFor="form-label">Annotation label</Typography>
                            <Input
                                handleChange={handleChange}
                                type="text"
                                label="Label"
                                name="label"    
                            />

                        <Typography variant="h6" className={classes.label} htmlFor="form-instruction">Task Instruction</Typography>
                            <Input
                                handleChange={handleChange}
                                type="text"
                                label="Instruction"
                                name="instruction"
                                multiline={true}
                                rows={10}
                            />
                    <Grid container spacing={1}>
                    {/* <Grid item xs={12} sm={3}> */}
                        <Typography variant="h6" className={classes.label} htmlFor="form-timespan">Task timespan</Typography>
                        <div className={classes.daysContainer}>
                            <Input
                                handleChange={handleChange}
                                type="number"
                                label="Timespan"
                                name="task-timespan"
                                InputProps={{ inputProps: { min: 1 } }}
                            />
                            <Typography variant="h6" style={{alignSelf: 'center', marginLeft: '5px'}}> Days </Typography>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                <Typography variant="h6">
                                    Submit
                                </Typography>
                            </Button>
                        </div>
                        {/* </Grid> */}
                    </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </form>
      </div>
  
    );
}

export default TaskForm;
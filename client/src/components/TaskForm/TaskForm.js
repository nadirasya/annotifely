import React, { useState } from 'react';
import { Button, ButtonBase, Grid, Typography, Box } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTask } from '../../actions/tasks';
import Input from './Input';
import useStyles from './styles';

const initialState = { UrlImage: '', title: '', label: '', instruction: '', timespan: ''};

const TaskForm= () => {

    const [taskData, setTaskData] = useState(initialState);

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

    const [picture, setPicture] = useState(null);
    const onChangePicture = e => {
    if (e.target.value) {
      console.log("picture: ", e.target.value);
      setPicture(e.target.value);
      
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
                <Typography className={classes.label} htmlFor="form-image">Image URL</Typography>
                    <Input
                        handleChange={onChangePicture}
                        type="text"
                        label="Image URL"
                        name="UrlImage"
                    />
                <Grid item>
                    <ButtonBase className={classes.image} >
                        <img className={classes.img} src={picture} />
                    </ButtonBase>
                </Grid>
                </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Grid item direction="column" justify="space-between" spacing={2}>
                    <Grid item xs>
                        <Typography className={classes.label} htmlFor="form-task">Task title</Typography>
                            <Input
                                handleChange={handleChange}
                                type="text"
                                label="Title"
                                name="title"
                            />
                        <Typography className={classes.label} htmlFor="form-label">Annotation label</Typography>
                            <Input
                                handleChange={handleChange}
                                type="text"
                                label="Label"
                                name="label"    
                            />

                        <Typography className={classes.label} htmlFor="form-instruction">Task Instruction</Typography>
                            <Input
                                handleChange={handleChange}
                                type="text"
                                label="Instruction"
                                name="instruction"
                                multiline={true}
                                rows={10}
                            />

                    <Grid item xs={12} sm={3}>
                        <Typography className={classes.label} htmlFor="form-timespan">Task timespan</Typography>
                            <Input
                                handleChange={handleChange}
                                type="number"
                                label="Timespan"
                                name="task-timespan"
                            />
                        <Typography className={classes.days} component="h1" variant="h5">Days</Typography>
                    </Grid>

                <Grid item >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        <Typography  variant="h6">
                            Submit
                        </Typography>
                    </Button>
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
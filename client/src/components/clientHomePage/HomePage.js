import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from "./styles";
import { createTask } from '../../api';
import TaskForm from '../TaskForm/TaskForm';

const HomePage = () => {
    const [taskForm, setTaskForm] = useState(false);
    const handleShowTaskForm = () => setTaskForm((prevTaskForm) => !prevTaskForm);
    const classes = useStyles();
    

    return (
        <div>
        {
            taskForm ?
            <div >
                <TaskForm/>
            </div>
            :   null    }

            <Box
                component="span" //uses different element but default styling is same
                m={1}
                className={`${classes.bottomRightBox} ${classes.box}`} >
                <Button className={classes.buttonPrimary} onClick={handleShowTaskForm}>
                    <b>Add Task</b>
                </Button>
            </Box>
       
    </div>
    );
}

export default HomePage;
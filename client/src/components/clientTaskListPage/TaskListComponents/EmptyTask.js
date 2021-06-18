import React from 'react';
import Box from "@material-ui/core/Box";
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './styles';
import vector_emptyTask from './vector_emptyTask.png';

const EmptyTask = ({handleAddTask}) => {

    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
                <Box 
                    component="div"
                    m={1}
                    className={`${classes.centerBox} ${classes.boxImage}`}>
                    < img src={vector_emptyTask} alt="vector_emptyTask" style={{width: 200}} />
                </Box>
                <Box 
                    component="div"
                    m={1}
                    className={`${classes.centerBox} ${classes.boxButton}`}>
                    <Button variant="contained" className={classes.buttonPrimary} onClick={handleAddTask}> 
                        <AddIcon className={classes.icon}/> 
                        <Typography variant="subtitle1"><b>Add Task</b></Typography>
                    </Button>
                </Box>
            </div>
        </>
    )
}

export default EmptyTask;
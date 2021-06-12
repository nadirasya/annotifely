import React from 'react';
import Box from "@material-ui/core/Box";
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './styles';
import vector_emptyTask from './vector_emptyTask.png';

const EmptyTask = () => {

    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
                <Box 
                    component="div"
                    m={1}
                    className={`${classes.centerBox} ${classes.boxImage}`}>
                    < img src={vector_emptyTask} alt="vector_emptyTask" style={{width: '170px'}} />
                </Box>
                <Box 
                    component="div"
                    m={1}
                    className={`${classes.centerBox} ${classes.boxButton}`}>
                    <Button variant="contained" className={classes.buttonPrimary}> 
                        <AddIcon className={classes.icon}/> Add Task
                    </Button>
                </Box>
            </div>
        </>
    )
}

export default EmptyTask;
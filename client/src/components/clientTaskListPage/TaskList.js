import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientTask } from '../../actions/tasks';

import {Container, Button, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import useStyles from './TaskListComponents/styles';
import { useHistory } from 'react-router-dom';

import EmptyTask from './TaskListComponents/EmptyTask';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      textTransform: 'none'
    },
}))(TableCell);

const TaskList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const history = useHistory();

    useEffect(() => {
        dispatch(getClientTask());
    }, [dispatch] );

    const handleAddTask = () => {
        // console.log('pressed')
        history.push('/client/add-task')
    }

    return (
        <>
        <Container className={classes.container}>
            <main>
                {
                    tasks.length === 0 ?
                    <EmptyTask handleAddTask={handleAddTask}/>
                    :
                    <div className={classes.titleContainer}>
                    <Grid container spacing={0}  direction="column" alignItems="center" justify="center" >
                        <Box component="div" m={1} style={{width: '100%'}} className={`${classes.spreadBox} ${classes.boxTitle}`}>
                            <Typography variant="h4">
                                <b>Task List</b>
                            </Typography>
                            <Button variant="contained" onClick={handleAddTask} className={classes.buttonTertiary} style={{
                                height: 40,
                                maxWidth: '135px', 
                                maxHeight: '50px', 
                                minWidth: '135px', 
                                minHeight: '50px' }}> 
                                <AddIcon className={classes.icon}/> Add Task
                            </Button>
                        </Box>
                    </Grid> 

                    <div style={{height: '70vh'}}>
                        <div className={classes.tableContainer}>
                            <TableContainer component={Paper}>
                                <Table stickyHeader size="small" aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">Title</StyledTableCell>
                                            <StyledTableCell align="left">Total Image</StyledTableCell>
                                            <StyledTableCell align="left">Annotaters</StyledTableCell>
                                            <StyledTableCell align="left">Time Remaining</StyledTableCell>
                                            <StyledTableCell align="left">Action</StyledTableCell>
                                            <StyledTableCell align="left"> </StyledTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {tasks.map((task) => (
                                            <TableRow key={task._id}>
                                                <TableCell align="left">{task?.title}</TableCell>
                                                <TableCell align="left">{task?.totalImage}</TableCell>
                                                <TableCell align="left">{task?.totalAnnotater}</TableCell>
                                                <TableCell align="left">{task?.timeRemaining} days </TableCell>
                                                <TableCell align="left">
                                                    <Button variant="contained" className={classes.buttonTertiary}> 
                                                    Download
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Button>
                                                        <SettingsOutlinedIcon className={classes.setting} /> 
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
                }
                </main>
        </Container>
        </>
    );
}

export default TaskList;
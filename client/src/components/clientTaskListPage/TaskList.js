import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientTask, updateTime } from '../../actions/tasks';

import {Container, Button, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import useStyles from './TaskListComponents/styles';
import { useHistory } from 'react-router-dom';

import EmptyTask from './TaskListComponents/EmptyTask';
import AddAdditionalTime from '../clientAddAdditionalTime/AddAdditionalTimeForm';

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
    const [additionalTimeTask, setAdditionalTimeTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState();

    useEffect(() => {
        console.log("hello this is useEffect")
        dispatch(getClientTask());
    }, [dispatch] );

    const handleAddTimeForm = (task) => {
        setSelectedTask(task);
        setAdditionalTimeTask(true);
    }

    const handleCancelAddTime = () => {
        setAdditionalTimeTask(false);
    }

    const handleConfirmAddTime = (time) => {
        console.log("time", time)
        dispatch(updateTime(time, selectedTask._id))
        setAdditionalTimeTask(false);
    }

    const handleAddTask = () => {
        history.push('/client/add-task')
    }

    function useOutsideAlerter(ref) {

        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setAdditionalTimeTask(true)
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    
      /**
       * Component that alerts if you click outside of it
       */
      function OutsideAlerter(props) {
          const wrapperRef = useRef(null);
          useOutsideAlerter(wrapperRef);
    
          return (
            <Container component="main" maxWidth="xs">
              <div ref={wrapperRef} onClick={props.onClick}>{props.children}</div>
            </Container>
          )
      }

    return (
        <>
        <div>
            {
                additionalTimeTask ? 
                <div className={classes.popupContainer}>
                <OutsideAlerter>
                    <AddAdditionalTime taskTitle={selectedTask.title} handleClickConfirm={handleConfirmAddTime} handleClickCancel={handleCancelAddTime} additionalTimeForm={additionalTimeTask}/>
                </OutsideAlerter>
                </div> 
                : null
            }

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

                    <div style={{height: '68vh'}}>
                        <div className={classes.tableContainer}>
                            <TableContainer component={Paper}>
                                <Table stickyHeader size="small" aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">Title</StyledTableCell>
                                            <StyledTableCell align="left">Total Image</StyledTableCell>
                                            <StyledTableCell align="left">Annotaters</StyledTableCell>
                                            <StyledTableCell align="left">Time Remaining</StyledTableCell>
                                            <StyledTableCell align="left" style={{width: '5%'}}>Action</StyledTableCell>
                                            <StyledTableCell align="left" style={{width: '10%'}}> </StyledTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {tasks.map((task) => (
                                            <TableRow key={task?._id}>
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
                                                    <Button onClick={() => handleAddTimeForm(task)}>
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
        </div>
        </>
    );
}

export default TaskList;
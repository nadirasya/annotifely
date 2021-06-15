import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, withStyles } from '@material-ui/core';
import useStyles from './styles';

import { getTasks } from '../../actions/tasks';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      textTransform: 'none',
    },
}))(TableCell);


const AnnotaterTaskPage = () => {
    const dispatch = useDispatch(); 
    const classes = useStyles();
    const tasks = useSelector((state) => state.tasks)
    
    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch])

    const handleAccept = (id) => {
        console.log("useEffect", tasks)
    };

    return (
        <div>
            <Container className={classes.container}>
            <div className={classes.pageTitle}>
                <Typography className={classes.h4}>
                   <b> Task List </b> 
                </Typography>
            </div>
            { !tasks.length ?
            <div style={{display: 'flex', justifyContent: 'center'}}> 
                <CircularProgress />
            </div>
            :
            <div style={{height: '75vh'}}>  
            <div className={classes.tableContainer}>
                <TableContainer component={Paper} className={classes.table}>
                    <Table stickyHeader aria-label="sticky header" size="small">
                        <TableHead>
                        <TableRow className={classes.tableRow}>
                            <StyledTableCell>
                                <Typography variant="subtitle1" color="secondary"><b>Client</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1" color="secondary"><b>Title</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1" color="secondary"><b>Total Image</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1" color="secondary"><b>Annotaters</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1" color="secondary"><b>Created At</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1" color="secondary"><b>Action</b></Typography>
                            </StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task._id}>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1" ><b>{task.clientName}</b></Typography>
                            </TableCell>
                            <TableCell align="left" >{task.title}</TableCell>
                            <TableCell align="left">future improvement</TableCell>
                            <TableCell align="left">future improvement</TableCell>
                            <TableCell align="left">
                                {task.timeRemaining === 0 ? 'Today' : task.timeRemaining === 1 ? `${task.timeRemaining} day ago` : `${task.timeRemaining} days ago`}
                            </TableCell>
                            <TableCell align="left">
                                <Button variant="contained" disableElevation onClick={() => handleAccept(task._id)}>Accept</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </div> }
            </Container>
        </div>
    )
}

export default AnnotaterTaskPage;
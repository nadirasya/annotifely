import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@material-ui/core';
import NavBar from '../Navbar/Navbar';
import useStyles from './styles';

import { getTasks } from '../../actions/tasks';

function createData(id, client, title, totalImage, annotaters, createdAt) {
    return { id, client, title, totalImage, annotaters, createdAt };
  }


const AnnotaterTaskPage = () => {
    const dispatch = useDispatch(); 
    const classes = useStyles();
    const tasks = useSelector((state) => state.tasks)
    

    useEffect(() => {
        dispatch(getTasks());  
    }, [dispatch]);

    const handleAccept = (id) => {
        console.log("useEffect", tasks)
    };

    return (
        <div>
            <div className={classes.pageTitle}>
                <Typography variant="h4">
                   <b> Task List </b> 
                </Typography>
            </div>
            { !tasks.length ?
            <div style={{display: 'flex', justifyContent: 'center'}}> 
                <CircularProgress />
            </div>
            :  
            <div className={classes.tableContainer}>
                <TableContainer component={Paper} style={{width: '70%'}}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell>
                                <Typography variant="subtitle1" color="secondary"><b>Clients</b></Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1" color="secondary"><b>Title</b></Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1" color="secondary"><b>Total Image</b></Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1" color="secondary"><b>Annotaters</b></Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1" color="secondary"><b>Created At</b></Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1" color="secondary"><b>Action</b></Typography>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task._id}>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1" ><b>future improvement</b></Typography>
                            </TableCell>
                            <TableCell align="right" >{task.title}</TableCell>
                            <TableCell align="right">future improvement</TableCell>
                            <TableCell align="right">future improvement</TableCell>
                            <TableCell align="right">{task.createdAt}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" disableElevation onClick={() => handleAccept(task._id)}>Accept</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> }
        </div>
    )
}

export default AnnotaterTaskPage;
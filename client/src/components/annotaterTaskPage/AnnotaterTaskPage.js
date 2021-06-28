import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, withStyles } from '@material-ui/core';
import useStyles from './styles';
import EmptyTask from './EmptyTask';
import { getTasks, getTasksById } from '../../actions/tasks';
import AnnotaterAnnotationPage from '../annotaterAnnotationPage/AnnotaterAnnotationPage';

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
    const history = useHistory();
    const classes = useStyles();
    const location = useLocation();
    const timer = useRef();
    const [loading, setLoading] = useState(true);

    let tasks = useSelector((state) => state.tasks)
    let load = location?.state?.load;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); 

    // if(load===true){
    //     load = false;
    //     window.location.reload();
    // }
    
    useEffect(() => {
        dispatch(getTasks(user.result._id));
        console.log(tasks)

        clearTimeout(timer.current);
        
    }, [dispatch, load])

    timer.current = window.setTimeout(() => {
        setLoading(false);
    }, 1500);

    const handleAccept = (id) => {
        history.push({
            pathname: '/annotater/task/annotation',
            state: { id: id, index: 0 }
        })
        dispatch(getTasksById(id));
        
    };

    return (
        <div>
        <Container className={classes.container}>
            <div className={classes.pageTitle}>
                <Typography className={classes.h4}>
                   <b> Task List </b> 
                </Typography>
            </div>
            { tasks.length ?
                <div>
                    { loading ? 
                        <div style={{display: 'flex', justifyContent: 'center'}}> 
                            <CircularProgress />
                        </div>
                        : 
                        <EmptyTask />
                    }
                </div>
            :
            <div style={{height: '75vh'}}>  
            <div className={classes.tableContainer}>
                <TableContainer component={Paper} className={classes.table}>
                    <Table stickyHeader aria-label="sticky header" size="small">
                        <TableHead>
                        <TableRow className={classes.tableRow}>
                            <StyledTableCell>
                                <Typography variant="subtitle1"><b>Client</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1"><b>Title</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1"><b>Total Image</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1"><b>Annotaters</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1"><b>Created At</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle1"><b>Action</b></Typography>
                            </StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task._id}>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1" ><b>{task?.client[0]?.name}</b></Typography>
                            </TableCell>
                            <TableCell align="left" >{task.title}</TableCell>
                            <TableCell align="left">{task?.totalImage}</TableCell>
                            <TableCell align="left">{task?.totalAnnotater}</TableCell>
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
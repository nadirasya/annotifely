import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Container, Card, CardContent, CircularProgress, withStyles } from '@material-ui/core';

import React, { useState, useEffect, useRef } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, getTasksById } from '../../actions/tasks';
import { getPerformanceScore } from '../../actions/verifications';
import { getClients } from '../../actions/clients';

import useStyles from './styles';
import learning from '../images/learning.png';
import AnnotationTutorial from '../annotationTutorial/annotationTutorial';
import EmptyTask from './EmptyTask';

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

  
const HomePage = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch(); 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); 
    const tasks = useSelector((state) => state.tasks.taskList)
    const totalTask = useSelector((state) => state.tasks.total)
    const verifications = useSelector((state) => state.tasks.performanceScore)
    const timer = useRef();
    const [loading, setLoading] = useState(true);


    const [tutorial, setTutorial] = useState(false);

    useEffect(() => {
        dispatch(getTasks(user.result._id));
        dispatch(getPerformanceScore(user.result._id));
        clearTimeout(timer.current);

    }, [dispatch])

    timer.current = window.setTimeout(() => {
        setLoading(false);
    }, 1500);

    const handleShowTutorial =  () => setTutorial((prevTutorial) => !prevTutorial);

    const handleAccept = (id) => {
        history.push({
            pathname: '/annotater/task/annotation',
            state: { id: id, index: 0 }
        })
        dispatch(getTasksById(id));
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setTutorial((prevTutorial) => !prevTutorial);
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
    <div>
        {
            tutorial ?
            <div className={classes.tutorialContainer}>
                <OutsideAlerter>
                    <AnnotationTutorial tutorial={tutorial} />
                </OutsideAlerter>
            </div>
            :
            null
        }

        <Container className={classes.container}>
            <div className={classes.pageTitle}>
                <Typography className={classes.h4}>
                   <b> Home </b> 
                </Typography>
            </div>

            { !tasks?.length ?
                <div>
                    { loading ? 
                        <div style={{display: 'flex', justifyContent: 'center', height: '40vh'}}> 
                            <CircularProgress />
                        </div>
                        : 
                        <EmptyTask />
                    }
                </div>
            :
            <div style={{height: '40vh'}}>
                <div className={classes.tableContainer}>
                    <TableContainer component={Paper} style={{ maxHeight: '40vh' }}>
                        <Table stickyHeader className={classes.table} size="small" aria-label="sticky header">
                            <TableHead>
                            <TableRow className={classes.tableRow} style={{alignItems: "left"}} >
                                <StyledTableCell>
                                    <Typography variant="subtitle1"><b>Client</b></Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="subtitle1"><b>Title</b></Typography>
                                </StyledTableCell>
                                <StyledTableCell >
                                    <Typography variant="subtitle1"><b>Total Image</b></Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="subtitle1"><b>Annotaters</b></Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="subtitle1"><b>Created At</b></Typography>
                                </StyledTableCell>
                                <StyledTableCell>
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
            </div>
            }

            <div>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6} lg={6} >
                        <div>
                            <Typography className={`${classes.componentTitle} ${classes.subtitle1}`} >
                                <b>Do you need help with annotating Image?</b>
                            </Typography>
                            <Button style={{width: '90%', height: '90%'}} onClick={handleShowTutorial}>
                                <Card className={classes.cardPrimary}>
                                    <CardContent>
                                        <Grid container spacing={0} >
                                            <Grid item xs={6} md={6} lg={6} style={{marginTop: '5vh'}}>
                                                <Typography className={classes.h5} style={{marginLeft: '1vh'}}>
                                                    <b>Click to learn how to annotate</b>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6}>
                                                <img src={learning} alt="" className={classes.image} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Button>
                        </div>
                    </Grid>
                    
                    <Grid item xs={12} md={6} lg={6} >
                        <div>
                            <Typography className={`${classes.componentTitle} ${classes.subtitle1}`} >
                                <b>Check your works</b>
                            </Typography>

                            <Grid container spacing={0} className={classes.gridContainer}>
                                <Grid item xs={6} md={6} lg={6}>
                                    <Button style={{width: '100%', height: '90%'}}  onClick={() => {history.push('/annotater/my-annotation')}}>
                                    <Card className={classes.cardSecondary}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography className={classes.h6}>
                                                <b>Total</b> <br />
                                                <b>Annotations</b>
                                            </Typography>
                                            {
                                                totalTask !== undefined ?
                                                <Typography className={classes.h2}>
                                                    <b>{totalTask}</b>
                                                </Typography>
                                                :
                                                <CircularProgress/>
                                            }
                                        </CardContent>
                                    </Card>
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>   
                                    <Button style={{width: '100%', height: '90%'}} onClick={() => {history.push('/annotater/my-annotation')}}>
                                    <Card className={classes.cardTertiary}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography className={classes.h6} >
                                                <b>Performance</b> <br />
                                                <b>Score</b>
                                            </Typography>
                                            {
                                                verifications !== undefined ?
                                                <Typography className={classes.h2}>
                                                    <b>{verifications}</b>
                                                </Typography>
                                                :
                                                <CircularProgress/>
                                            }
                                        </CardContent>
                                    </Card>
                                    </Button>
                                </Grid>
                            </Grid>        
                        </div>
                    </Grid>
                </Grid>
            </div>
       
        </Container>
    </div>
    )
}

export default HomePage;
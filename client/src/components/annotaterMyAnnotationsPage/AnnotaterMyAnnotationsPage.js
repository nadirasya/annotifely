import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, CircularProgress, withStyles } from '@material-ui/core';
import useStyles from './styles';
import FeedbackForm from '../annotaterFeedbackForm/FeedbackForm';
import { getAnnotaterTask, getTasksById } from '../../actions/tasks';
import { getAnnotationByIdAnnotater } from '../../actions/annotations';
import { useHistory } from 'react-router';
import EmptyTask from './EmptyTask';
import { getAnnotationByIdTask } from '../../actions/annotations';

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

const AnnotaterMyAnnotationsPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch(); 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); 
    const tasks = useSelector((state) => state.tasks)
    const annotations = useSelector((state) => state.annotations.annotations )
    const timer = useRef();
    const [loading, setLoading] = useState(true);

    // tasks = tasks.unavailable

    const [feedbackForm, setFeedbackForm] = useState(false);

    useEffect(()=> {
        dispatch(getAnnotaterTask(user.result._id));
        dispatch(getAnnotationByIdAnnotater(user.result._id));
        clearTimeout(timer.current);
    }, [dispatch])

    timer.current = window.setTimeout(() => {
        setLoading(false);
    }, 1500);

    const handleShowFeedback =  (id) => {
        dispatch(getAnnotationByIdTask(id, user.result._id));
        dispatch(getTasksById(id));
        history.push({
            pathname: '/annotater/verification',
            state: { id: id, index: 0}
        })
    }

    const handleClickCancel = ()  => {
        setFeedbackForm(false)
    }

    const handleAddAnnotation = () => {
        history.push('/annotater/task');
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                   setFeedbackForm(false)
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

    const handleEdit = (id) => {
        dispatch(getAnnotationByIdTask(id, user.result._id));
        dispatch(getTasksById(id));
        history.push({
            pathname: '/annotater/task/annotation',
            state: { id: id, index: 0, type: 'edit'}
        })
    }


    return (
    <div>
    { feedbackForm ?
        <div className={classes.feedbackFormContainer}>
            <OutsideAlerter>
                <FeedbackForm 
                    feedback={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'} 
                    handleClickCancel={handleClickCancel} 
                    feedbackForm={feedbackForm}/>
            </OutsideAlerter>
        </div>
        : 
        null
    }

    <Container className={classes.container}>
        <div className={classes.pageTitle}>
            <Typography className={classes.h4}>
                <b> My Annotations List</b> 
            </Typography>
        </div>
        { !tasks.length ?
            <div>
                { loading ? 
                    <div style={{display: 'flex', justifyContent: 'center'}}> 
                        <CircularProgress />
                    </div>
                    : 
                    <EmptyTask handleAddAnnotation={handleAddAnnotation} />
                }
            </div>
            :
            <div>
                <div style={{height: '75vh'}}>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper} className={classes.table}>
                            <Table stickyHeader size="small" aria-label="sticky table">
                                <TableHead>
                                <TableRow className={classes.tableRow} style={{alignItems: "left", backgroundColor: '#567068'}} >
                                    <StyledTableCell>
                                        <Typography variant="subtitle1"><b>Title</b></Typography>
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        <Typography variant="subtitle1"><b>Total Image</b></Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="subtitle1"><b>Time Remaining</b></Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="subtitle1"><b>Score</b></Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                    </StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {annotations?.map((row) => (
                                    <TableRow key={row._id} style={{alignItems: "left"}}>
                                    <TableCell>{row.task[0]?.title}</TableCell>
                                    <TableCell>{row.task[0]?.totalImage}</TableCell>
                                    <TableCell>
                                        {
                                            row?.timeRemaining === 1 ? `${row?.timeRemaining} day` :
                                            row?.timeRemaining <= 1 ? '-':
                                            `${row?.timeRemaining} days`
                                        } 
                                    </TableCell>
                                    <TableCell>
                                        {
                                            row.totalScore != null ?
                                            row.totalScore+'/'+row.totalImage*10 : '-'
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={6} lg={6}>
                                                {
                                                    row.totalScore? 
                                                    <Button variant="contained" disableElevation className={classes.buttonTertiary} onClick={() => handleShowFeedback(row?.task[0]?._id)}>
                                                        <Typography variant="subtitle2" >Feedback</Typography>
                                                    </Button>
                                                    :
                                                    <Button variant="contained" disableElevation className={classes.buttonTertiaryDisabled} disabled>
                                                        <Typography variant="subtitle2" >Feedback</Typography>
                                                    </Button>
                                                }
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                {
                                                    row.timeRemaining>=1 ? 
                                                    <Button variant="contained" disableElevation className={classes.buttonTertiary} onClick={() => handleEdit(row?.task[0]?._id)}>
                                                        <Typography variant="subtitle2">Edit</Typography>
                                                    </Button>
                                                    :
                                                    <Button variant="contained" disableElevation className={classes.buttonTertiaryDisabled} disabled>
                                                        <Typography variant="subtitle2">Edit</Typography>
                                                    </Button>
                                                }
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        {row.totalScore !== row.totalImage*10 &&  row.totalScore !== undefined?
                                        <div style={{backgroundColor: 'yellow', color: 'black', padding: '5px', display: 'flex', justifyContent: 'center', borderRadius: '5px'}} >
                                            Please check the feedback and edit the annotation to improve your score 
                                        </div>
                                        : null}
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
    </Container>
    </div>
    )
};

export default AnnotaterMyAnnotationsPage;
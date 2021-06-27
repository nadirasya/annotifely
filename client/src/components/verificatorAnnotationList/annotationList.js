import React, {useState, useEffect, useRef} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, withStyles } from '@material-ui/core';
import makeStyles from './styles';

import { getAnnotations, getAnnotationByIdTask } from '../../actions/annotations';
import { getTasksById } from '../../actions/tasks';

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

const AnnotationList = () => {
    const classes = makeStyles();

    const dispatch = useDispatch(); 
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const annotations = useSelector((state) => state.annotations['annotatedData'])

    useEffect(() => {
        dispatch(getAnnotations());
    }, [dispatch])


    const handleReview = (id, userId) => {
        dispatch(getAnnotationByIdTask(id, userId));
        dispatch(getTasksById(id));
        history.push({
            pathname: '/verificator/verification-page',
            state: { id: id, index: 0 }
        })
    }

    return (
    <div>
        {/* {annotations == undefined ?
            <CircularProgress/>
        : */}
        <Container className={classes.container}>
            <div className={classes.pageTitle}>
                <Typography className={classes.h4}>
                <b> Annotations List</b> 
                </Typography>
            </div>
            <div style={{height: '75vh'}}>
            <div className={classes.tableContainer}>
                <TableContainer component={Paper} className={classes.table}>
                    <Table stickyHeader size="small" aria-label="sticky table">
                        <TableHead>
                        <TableRow className={classes.tableRow} style={{alignItems: "left", backgroundColor: '#567068'}} >
                            <StyledTableCell>
                                <Typography variant="subtitle1" color="secondary"><b>Annotater</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="subtitle1" color="secondary"><b>Title</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell >
                                <Typography variant="subtitle1" color="secondary"><b>Total Image</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="subtitle1" color="secondary"><b>Submitted</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="subtitle1" color="secondary"><b>Action</b></Typography>
                            </StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {annotations.map((annotation) => (
                            <TableRow key={annotation._id} style={{alignItems: "left"}}>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1" ><b>{annotation?.annotater[0]?.name}</b></Typography>
                            </TableCell>
                            <TableCell>{annotation?.task[0]?.title}</TableCell>
                            <TableCell>{annotation?.task[0]?.totalImage}</TableCell>
                            <TableCell>
                                {annotation.submitted === 0 ? 'Today' : annotation.submitted === 1 ? `${annotation.submitted} day ago` : `${annotation.submitted} days ago`}
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" disableElevation className={classes.buttonTertiary} onClick={() => handleReview(annotation.task[0]._id, annotation.annotater[0]._id)}>
                                    <Typography variant="subtitle2">Review</Typography>
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </div>
        </Container>
{/* } */}
    </div>
    )
};

export default AnnotationList;
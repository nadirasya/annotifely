import React, {useState, useEffect, useRef} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Button, CircularProgress, withStyles } from '@material-ui/core';
import makeStyles from './styles';

import { getAnnotations, getAnnotationByIdTask } from '../../actions/annotations';
import { getTasksById } from '../../actions/tasks';
import EmptyTask from './EmptyTask';

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
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const annotations = useSelector((state) => state.annotations['annotatedData'])
    const timer = useRef();
    let load = location?.state?.load;
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        dispatch(getAnnotations());
        clearTimeout(timer.current);

    }, [dispatch, load===true, annotations])

    timer.current = window.setTimeout(() => {
        setLoading(false);
    }, 1500);

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
        <Container className={classes.container}>
            <div className={classes.pageTitle}>
                <Typography className={classes.h4}>
                <b> Annotations List</b> 
                </Typography>
            </div>
            { annotations.length === 0 ?
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
            <div> 
                <div style={{height: '75vh'}}>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper} className={classes.table}>
                            <Table stickyHeader size="small" aria-label="sticky table">
                                <TableHead>
                                <TableRow className={classes.tableRow} style={{alignItems: "left", backgroundColor: '#567068'}} >
                                    <StyledTableCell>
                                        <Typography variant="subtitle1"><b>Annotater</b></Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="subtitle1"><b>Title</b></Typography>
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        <Typography variant="subtitle1"><b>Total Image</b></Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="subtitle1"><b>Submitted</b></Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="subtitle1"><b>Action</b></Typography>
                                    </StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {annotations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((annotation) => (
                                    <TableRow key={annotation._id} style={{alignItems: "left"}}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="subtitle1" ><b>{annotation?.annotater[0]?.name}</b></Typography>
                                    </TableCell>
                                    <TableCell>{annotation?.task[0]?.title}</TableCell>
                                    <TableCell>{annotation?.task[0]?.totalImage}</TableCell>
                                    <TableCell>
                                        {annotation.submitted === 0 ? 'Today' : annotation.submitted === 1 ? `${annotation.submitted} day ago` : `${annotation.submitted} days ago`}
                                        {/* {annotation.submitted > '24 hours ago' ? 'Today' : `${annotation.submitted}`} */}
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
                            
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={annotations.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        </TableContainer>
                    </div>
                </div>
            </div>
            }
        </Container>
    </div>
    )
};

export default AnnotationList;
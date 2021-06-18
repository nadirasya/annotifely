import React, {useState, useEffect, useRef} from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, withStyles } from '@material-ui/core';

import useStyles from './styles';
import FeedbackForm from '../annotaterFeedbackForm/FeedbackForm';
import { useHistory } from 'react-router';

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

function createData(id, client, title, totalImage, timeRemaining) {
    return { id, client, title, totalImage, timeRemaining };
}
  
const rows = [
    createData(1, 'Dharma Baskara', 'Cari kendaraan roda 2', 6, 24),
    createData(2, 'Irfan Mahendra', 'Cari barang berbahan kaca', 9, 37),
    createData(3, 'Reina Shabira', 'Cari daun menjari', 16, 24),
    createData(4, 'Kevin Andrio', 'Cari jembatan', 3, 67),
]

const AnnotaterMyAnnotationsPage = () => {
    const classes = useStyles();
    const history = useHistory();

    const [feedbackForm, setFeedbackForm] = useState(false);

    const handleShowFeedback =  () => setFeedbackForm(true);

    const handleClickCancel = ()  => {
        setFeedbackForm(false)
    }

    const handleAccept = (id) => {
        console.log(id);
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

    const handleEdit = ({id}) => {
        history.push({
            pathname: '/annotater/task/annotation',
            state: { id: id, index: 0, type: 'edit'}
        })
        // dispatch(getTasksById(id));
    }


    return (
    <div>
        {
            feedbackForm ?
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
            
            <div style={{height: '75vh'}}>
            <div className={classes.tableContainer}>
                <TableContainer component={Paper} className={classes.table}>
                    <Table stickyHeader size="small" aria-label="sticky table">
                        <TableHead>
                        <TableRow className={classes.tableRow} style={{alignItems: "left", backgroundColor: '#567068'}} >
                            <StyledTableCell>
                                <Typography variant="subtitle1" color="secondary"><b>Clients</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="subtitle1" color="secondary"><b>Title</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell >
                                <Typography variant="subtitle1" color="secondary"><b>Total Image</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="subtitle1" color="secondary"><b>Time Remaining</b></Typography>
                            </StyledTableCell>
                            <StyledTableCell  style={{width: '20%'}}>
                                <Typography variant="subtitle1" color="secondary"><b>Action</b></Typography>
                            </StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.title} style={{alignItems: "left"}}>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1" ><b>{row.client}</b></Typography>
                            </TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.totalImage}</TableCell>
                            <TableCell>{row.timeRemaining}</TableCell>
                            <TableCell>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Button variant="contained" disableElevation className={classes.buttonTertiary} onClick={handleShowFeedback}>
                                            <Typography variant="subtitle2" >Feedback</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                    <Button variant="contained" disableElevation className={classes.buttonTertiary} onClick={() => handleEdit(row.id)}>
                                        <Typography variant="subtitle2">Edit</Typography>
                                    </Button>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </div>
        </Container>
    </div>
    )
};

export default AnnotaterMyAnnotationsPage;
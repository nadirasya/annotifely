import React from 'react';
import { Button, Typography, Box, Grid } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

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

function createData(no, title, totalImage, annotaters, time) {
    return { no, title, totalImage, annotaters, time };
}
  
const rows = [
    createData(1,'Cari Kendaraan Roda 2', 15, 700, 1),
    createData(2,'Cari Kendaraan Roda 4', 2, 10, 37),
];

const Tasks = () => {
    const classes = useStyles();

    return (
        <>
        <div className={classes.container}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center" >
                    <Box 
                        component="div"
                        m={1}
                        style={{width: '80%'}}
                        className={`${classes.spreadBox} ${classes.boxTitle}`}>
                            <Typography variant="h4">
                                <b>Task List</b>
                            </Typography>
                            <Button variant="contained" className={classes.buttonTertiary} style={{
                                height: 40,
                                maxWidth: '135px', 
                                maxHeight: '50px', 
                                minWidth: '135px', 
                                minHeight: '50px' }}> 
                                <AddIcon className={classes.icon}/> Add Task
                            </Button>
                </Box>
            </Grid> 

            <div className={classes.tableContainer}>
                <TableContainer component={Paper} style={{width: '80%'}}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell align="left">Title</StyledTableCell>
                                <StyledTableCell align="left">Total Image</StyledTableCell>
                                <StyledTableCell align="left">Annotaters</StyledTableCell>
                                <StyledTableCell align="left">Time Remaining</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                                <StyledTableCell align="left"> </StyledTableCell>
                            </TableRow>
                        </TableHead>

                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.no}>
                                        <TableCell component="th" scope="row">
                                            {row.no}
                                        </TableCell>
                                        <TableCell align="left">{row.title}</TableCell>
                                        <TableCell align="left">{row.totalImage}</TableCell>
                                        <TableCell align="left">{row.annotaters}</TableCell>
                                        <TableCell align="left">{row.time} d</TableCell>
                                        <TableCell align="left">
                                        <Button variant="contained" className={classes.buttonTertiary} style={{
                                            height: 40,
                                            maxWidth: '99px', 
                                            maxHeight: '32px', 
                                            minWidth: '99px', 
                                            minHeight: '32px' }}> 
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
        </>
    );
}

export default Tasks;
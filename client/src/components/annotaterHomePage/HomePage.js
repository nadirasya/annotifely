
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';

import React from 'react';
import NavBar from '../Navbar/Navbar';
import useStyles from './styles';

function createData(id, client, title, totalImage, annotaters, createdAt) {
    return { id, client, title, totalImage, annotaters, createdAt };
  }
  
  const rows = [
    createData(1, 'Dharma Baskara', 'Cari kendaraan roda 2', 6, 24, 2),
    createData(2, 'Irfan Mahendra', 'Cari barang berbahan kaca', 9, 37, 3),
    createData(3, 'Reina Shabira', 'Cari daun menjari', 16, 24, 6),
    createData(4, 'Kevin Andrio', 'Cari jembatan', 3, 67, 4),
    createData(5, 'Tasya Anasti', 'Cari dan tandai objek manusia', 1, 49, 3),]


  
const HomePage = () => {
    const classes = useStyles();
    const handleAccept = (id) => {
        console.log(id);
    }

    return (
        <div>
            <div className={classes.pageTitle}>
                <Typography variant="h4">
                   <b> Home </b> 
                </Typography>
            </div>
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
                        {rows.map((row) => (
                            <TableRow key={row.title}>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1" ><b>{row.client}</b></Typography>
                            </TableCell>
                            <TableCell align="right" >{row.title}</TableCell>
                            <TableCell align="right">{row.totalImage}</TableCell>
                            <TableCell align="right">{row.annotaters}</TableCell>
                            <TableCell align="right">{row.createdAt}h ago </TableCell>
                            <TableCell align="right">
                                <Button variant="contained" disableElevation onClick={() => handleAccept(row.id)}>Accept</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            
        </div>
    )
}

export default HomePage;
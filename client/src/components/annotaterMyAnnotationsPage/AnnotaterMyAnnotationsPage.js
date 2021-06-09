import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom'
import NavBar from '../Navbar/Navbar';
import useStyles from './styles';


const AnnotaterMyAnnotationsPage = () => {
    const classes = useStyles();
    return (
        <div>
        <div className={classes.pageTitle}>
            <Typography variant="h4">
               <b> My Annotations </b> 
            </Typography>
        </div>
    </div>
    )
};

export default AnnotaterMyAnnotationsPage;
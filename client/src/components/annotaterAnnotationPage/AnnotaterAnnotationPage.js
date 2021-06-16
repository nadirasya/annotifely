import React, {useEffect} from 'react';
import { Typography, Paper, Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom'
import NavBar from '../Navbar/Navbar';
import useStyles from './styles';
import boundingBoxLogo from '../images/bounding box.png';
import deleteLogo from '../images/delete.png';
import redoLogo from '../images/redo.png';
import undoLogo from '../images/undo.png';
import ToolsButton from './ToolsButton';
import theme from '../../theme';



const AnnotaterAnnotationPage = props => {
    const classes = useStyles();
    const location = useLocation();


    useEffect(() => {
        console.log(location.state.idTask)
    }, )

    return (
    <div style={{paddingLeft: '5%', paddingRight: '2%', paddingBottom: '3%'}}>
        <div className={classes.pageTitle}>
            <Typography variant="h4">
               <b> My Annotations </b> 
            </Typography>
        </div>
        <div className={classes.labelContainer}>
            <div>
                <div className={classes.taskLabel}>
                    <Typography variant="h6">
                        Tandai tanda lalu lintas menggunakan bounding box 
                    </Typography>
                </div> 
                <div className={classes.imageContainer}>
                    <img
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                        src="https://images.unsplash.com/photo-1525480122447-64809d765ec4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
                    </div>
                </div>
                
            <div className={classes.rightContainer}>
                <div>
                    <div className={classes.taskLabel}>
                        <Typography variant="h6">
                            <b>Tools</b>
                        </Typography>
                    </div>
                    <div className={classes.toolsContainer}>
                            <ToolsButton image={boundingBoxLogo} label="Bounding Box" />
                            <ToolsButton image={deleteLogo} label="Delete" />
                            <ToolsButton image={undoLogo} label="Undo" />
                            <ToolsButton image={redoLogo} label="Redo" />
                    </div>
                </div>
                <div className={classes.submitButtonContainer}>
                    <Button color="primary" variant="contained" className={classes.buttonContainer}>
                        <Typography variant="h6">
                            <b>Submit</b>
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
        
    </div>
    )
};

export default AnnotaterAnnotationPage;
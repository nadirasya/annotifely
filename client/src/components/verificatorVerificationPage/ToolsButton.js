import React from 'react';
import { Typography, Paper, Button } from '@material-ui/core';
import useStyles from './styles';


const ToolsButton = ({image, label, onClick, selected}) => {
    const classes = useStyles();

    return (
        <Button style={{width: 100}} onClick={onClick}>
            <div>
                <div>
                    <img src={image} alt="logo" className={classes.logo}/>
                </div>
                <div>
                    <Typography variant="subtitle1">
                        <b>{label}</b>
                    </Typography>
                </div>
            </div>
        </Button>
    )
}

export default ToolsButton;
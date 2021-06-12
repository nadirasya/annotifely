import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import LoginForm from "../LoginForm/LoginForm";
import useStyles from "./style";

const Header = ({handleShowLoginForm}) => {
    const classes = useStyles();



    return (
        <>
            <Box
                component="span" //uses different element but default styling is same
                m={1}
                className={`${classes.bottomRightBox} ${classes.box}`} >
                <Button variant="contained" className={classes.buttonPrimary} onClick={handleShowLoginForm}>
                    <b>Login</b>
                </Button>
            </Box>
        </>
    );
}

export default Header;
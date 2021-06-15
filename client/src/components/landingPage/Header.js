import React from 'react';
import {Box, Button, Typography} from "@material-ui/core";

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
                    <Typography className={classes.subtitle1}>
                        <b>Login</b>
                    </Typography>
                </Button>
            </Box>
        </>
    );
}

export default Header;
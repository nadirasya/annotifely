import React from 'react';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import useStyles from "./style";

const Header = () => {
    const classes = useStyles();

    return (
        <>
            <Box
                component="span" //uses different element but default styling is same
                m={1}
                className={`${classes.bottomRightBox} ${classes.box}`} >
                <Button className={classes.buttonPrimary}>
                    <b>Login</b>
                </Button>
            </Box>
        </>
    );
}

export default Header;
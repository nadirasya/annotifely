import React from 'react';
import Box from "@material-ui/core/Box";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

import useStyles from "./style";

const Footer = () => {
    const classes = useStyles();

    return (
        <>
            <footer className={classes.footer}>
                <Container maxWidth="lg">
                    <Box
                        component="span" //uses different element but default styling is same
                        className={`${classes.centerBox} ${classes.box}`} style={{color: '#ffffff'}}>
                        <Typography variant="h4">
                          <b>Get Started</b>
                        </Typography>

                    </Box>
                    
                    <Box
                      component="span"
                      className={`${classes.spreadFooterBox} ${classes.boxFooter}`}>
                        <div>
                          <Typography variant="h6">Do you need help with your training data?</Typography>
                          <a
                            target="_blank"
                            href="#" style={{color: '#ffffff'}}
                            fontStyle="italic">
                              <Box fontStyle="italic" style={{marginTop: 0, height: 10}}>
                              Learn More
                              </Box>
                          </a>
                          <br />
                          <Button className={classes.buttonSecondary}>
                            <b>Join as Client</b>
                          </Button>
                        </div>
                        <div>
                          <Typography variant="h6">Do you want to join us and get a part time job?</Typography>
                          <a
                            target="_blank"
                            href="#" style={{color: '#ffffff'}}
                            fontStyle="italic">
                              <Box fontStyle="italic" style={{marginTop: 0, height: 10}}>
                              Learn More
                              </Box>
                          </a>
                          <br />
                          <Button className={classes.buttonSecondary}>
                            <b>Join as Annotater</b>
                          </Button>
                        </div>
                    </Box>
                </Container>
            </footer>
        </>
    );
}

export default Footer;
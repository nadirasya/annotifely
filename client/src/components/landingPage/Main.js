import React from 'react';
import Box from "@material-ui/core/Box";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import vector_landingpage from "./vector_landingpage.png";
import Header from './Header';
import useStyles from "./style";

const Main = ({handleShowLoginForm}) => {
    const classes = useStyles();
    return (
        <>
        <div className={classes.content}>
            <Container className={classes.container}>
          <Header handleShowLoginForm={handleShowLoginForm}/>
          </Container>
                <Container maxWidth="md" >
                    <Grid container spacing={0} >
                        <Grid item xs={12} md={6} style={{alignItems: "center"}}> 
                        <Box
                                component="span" //uses different element but default styling is same
                                m={1}
                                className={`${classes.bottomRightBox} ${classes.boxMainImage}`}>
                                <img src={vector_landingpage} alt="vector_landingpage" style={{width: '50vh'}} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignItems: "center"}}>
                            <Box
                                component="span" //uses different element but default styling is same
                                m={1}
                                className={`${classes.descriptionBox} ${classes.boxMainDescription}`} >
                                <div>
                                    <Typography className={classes.h2}>
                                        <b> Annotifely</b>
                                    </Typography>
                                    <Typography className={classes.h6}>
                                        <b>Annotifely is a web app that helps you to annotate your image with the help from our annotaters</b>
                                    </Typography> 
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}

export default Main;
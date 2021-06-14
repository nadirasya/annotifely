import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import Slider from 'infinite-react-carousel';

import makeStyles from './styles';

import tutorial1 from '../images/tutorial1.png';
import tutorial2 from '../images/tutorial2.png';
import tutorial3 from '../images/tutorial3.png';
import tutorial4 from '../images/tutorial4.png';

const annotationTutorial = () => {
    const classes = makeStyles();
    const settings = {
        dots: true,
        wheel: true,
        centerMode: true,
        overScan: 0,
        centerPadding: 55
    }
    
    return (
        <div>
        <Paper className={classes.paper} elevation={3}>
            <div>
               <Button disabled><Typography variant="h6" style={{color: "#FFFFFF"}}>This is tutorial This is Tutorial This is Tutorial this is </Typography></Button>
                <Slider {...settings}>
                    <div>
                        <Button className={classes.button} disabled>
                            <div>
                            <img src={tutorial1} alt="" style={{width: '90%'}} /> 
                            <Typography variant="subtitle1" className={classes.description}><b>Click on the "Accept" button for the task you want to work on.</b></Typography>
                            </div>
                        </Button>
                    </div>
                    <div>
                        <Button className={classes.button} disabled>
                            <div>
                            <img src={tutorial2} alt="" style={{width: '90%'}} /> 
                            <Typography variant="subtitle1" className={classes.description}><b>Read the instruction above the image carefully.</b></Typography>
                            </div>
                        </Button>
                    </div>
                    <div>
                        <Button className={classes.button} disabled>
                            <div>
                            <img src={tutorial3} alt="" style={{width: '90%'}} /> 
                            <Typography variant="subtitle1" className={classes.description}><b>Complete the task by drawing a bounding box according to the instruction. You can use the available tools.</b></Typography>
                            </div>
                        </Button>
                    </div>
                    <div>
                        <Button className={classes.button} disabled>
                            <div>
                            <img src={tutorial4} alt="" style={{width: '90%'}} /> 
                            <Typography variant="subtitle1" className={classes.description}><b>If you're done, click the submit button. The result will be validated by our verificator.</b></Typography>
                            </div>
                        </Button>
                    </div>
                </Slider>
            </div>
        </Paper>
        </div>
    )
}

export default annotationTutorial;
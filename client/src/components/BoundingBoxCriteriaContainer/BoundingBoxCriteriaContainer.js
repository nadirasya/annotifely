import { Box, Typography, Button} from '@material-ui/core';
import React from 'react';
import useStyles from './style';

const BoundingBoxCriteria = () => {
    const classes = useStyles();

    return (
        <div>
            <Box component="span" m={0} className={`${classes.centerBox} ${classes.boxComment}`}>
                <Button disabled style={{width:'100%', color:'#000000'}}>
                    <Typography variant="body2" >
                    <b>Bounding Box Criteria</b>
                    </Typography>
                </Button>
                <Typography variant="body2" >
                1. Bounding box must cover the total extent of the object.
                </Typography>
                <Typography variant="body2" >
                2. Bounding box must contains only the correct object according to the instruction.
                </Typography>
                <Typography variant="body2" >
                3. The tighter the fit of the bounding box to the object is better.
                </Typography>
                <Typography variant="body2" >
                4. Bounding box must contains all of the correct objects according to the instruction that are visible through glass.
                </Typography>
                <Typography variant="body2" >
                5. Bounding box should contain all visible pixels, except where the bounding box would have to be made excessively large to include a few additional pixels e.g. a car aerial.
                </Typography>
                <Typography variant="body2" >
                6. If an object is ‘occluded’ by a close-fitting occluder e.g. clothing, mud, snow etc., then the occluder should be treated as part of the object.
                </Typography>
            </Box>
        </div>
    );
}

export default BoundingBoxCriteria;
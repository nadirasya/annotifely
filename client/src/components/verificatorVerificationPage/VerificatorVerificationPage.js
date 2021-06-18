import React, {useEffect, useRef, useState} from 'react';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles';
import createAnnotation from './createAnnotation';
import { Annotorious } from '@recogito/annotorious';
import { useDispatch } from 'react-redux';
import Input from './Input'



import '@recogito/annotorious/dist/annotorious.min.css';

const VerificatorVerificationPage = props => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch(); 

    // Ref to the image DOM element
    const imgEl = useRef();

    // The current Annotorious instance
    const [ anno, setAnno ] = useState();

    const [ selected, setSelected ] = useState();
    const [ histories, setHistories ] = useState({annotations: [], current: ''});
    // let images = useSelector((state) => state.images['allImage'])
    // const currentIndex = location.state.index;
    // const id = location.state.id;
    // const totalImage = images?.length;
    
    // Current drawing tool name
    const [ tool, setTool ] = useState();

    useEffect(() => {
        let annotorious = null;
        
        if (imgEl.current) {
          // Init
          annotorious = new Annotorious({
            image: imgEl.current,
            disableEditor: true,
            readOnly: true,
          });
          
            annotorious.setAnnotations(createAnnotation({id: 123, label: 'test', x: 0, y: 0, width: 300.891, height: 450.67}));
        }
    
        // Keep current Annotorious instance in state
        setAnno(annotorious);
      }, []);

    const handleButton = async() => {
    }
    
    return (
    // images?.length == null ?
    // <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
    //   <CircularProgress/>
    // </div>
    //   :
    <div style={{paddingLeft: '5%', paddingRight: '2%', paddingBottom: '3%'}}>
        <div className={classes.pageTitle}>
            <Typography variant="h4">
               <b>Verification Form</b> 
            </Typography>
        </div>
        <div className={classes.labelContainer}>
            <div>
                <div className={classes.taskLabel}>
                    <Typography variant="h6">
                        Tandai ...
                    </Typography>
                </div> 
                <div className={classes.imageContainer}>
                    <img
                        ref={imgEl} 
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                        src="https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        />
                    </div>
                </div>
                
            <div className={classes.rightContainer}>
                <div>
                    <div>
                        <Typography variant="h6" className={classes.label} htmlFor="form-task">
                            <b>Score</b>
                        </Typography>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Input
                                // handleChange={handleChange}
                                type="text"
                                label="Score"
                                name="score"
                                half
                            />
                            <Typography variant="h6" className={classes.label} htmlFor="form-task" style={{marginLeft: '15px'}}>
                                <b>/100</b>
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Typography variant="h6" className={classes.label} htmlFor="form-task">
                            <b>Feedback</b>
                        </Typography>
                        <Input
                            // handleChange={handleChange}
                            type="text"
                            label="Feedback"
                            name="feedback"
                            multiline
                            rows={10}
                        />
                    </div>
                </div>
                <div className={classes.submitButtonContainer}>
                    <div className={classes.imageCounter}>
                      <Typography variant="h4">
                        <b>1/1</b>
                      </Typography>
                    </div>
                    <Button color="primary" variant="contained" className={classes.buttonContainer} onClick={handleButton}>
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

export default VerificatorVerificationPage;
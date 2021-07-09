import React, {useEffect, useRef, useState} from 'react';
import { Typography, Button, CircularProgress, Box, Container } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles';
import createAnnotation from './createAnnotation';
import { Annotorious } from '@recogito/annotorious';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input'
import createAnnotationObject from './createAnnotation';
import { createVerification, storeVerification, fetchVerification } from '../../actions/verifications';
import BoundingBoxCriteria from '../BoundingBoxCriteriaContainer/BoundingBoxCriteriaContainer';

import '@recogito/annotorious/dist/annotorious.min.css';

const initialState = { score: '', feedback: '' };

const VerificatorVerificationPage = props => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch(); 

    // Ref to the image DOM element
    const imgEl = useRef();

    // The current Annotorious instance
    const [ anno, setAnno ] = useState();

    // Current drawing tool name
    const [ tool, setTool ] = useState();

    const [ verificationData, setVerificationData ] = useState(initialState);

    let images = useSelector((state) => state.images['allImage'])
    const annotatedStore = useSelector((state) => state.annotations['annotations'])
    const verifications = useSelector((state) => state.verifications)
    const currentIndex = location.state.index;
    const id = location.state.id;
    const totalImage = images?.length;
    const annotationsTemp = []

    useEffect(() => {
        let annotorious = null;

        if (imgEl.current) {
          // Init
          annotorious = new Annotorious({
            image: imgEl.current,
            disableEditor: true,
            readOnly: true,
          });
          
          annotatedStore[currentIndex]?.boundingBox?.map((box)=>{
            annotationsTemp.push(createAnnotationObject({id: box._id, label: images[currentIndex]?.task[0]?.label, x: box.x, y: box.y, width: box.width, height: box.height})) 
          })
          annotorious.setAnnotations(annotationsTemp);
        }
    
        // Keep current Annotorious instance in state
        setAnno(annotorious);

        if(annotorious !== null) {
            return () => annotorious.destroy();}
      }, [images, currentIndex]);

    function searchImage(id, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i]._id === id) {
                // console.log("found", myArray[i]?.imageURL)
                return myArray[i]?.imageURL;
            }
        }
    }

    const handleButton = async() => {
        if(currentIndex!=totalImage-1){
            dispatch(storeVerification(verificationData, annotatedStore[currentIndex]?._id));
            console.log(verifications)
            setVerificationData(initialState)
            history.push({
              pathname: '/verificator/verification-page',
              state: { id: id, index: currentIndex+1 }
            })
        } else {
            dispatch(fetchVerification())
            await verifications.push({ verificationData: verificationData, annotationId: annotatedStore[currentIndex]?._id})
            dispatch(createVerification(verifications))
            history.push({
                pathname: '/verificator',
                state: { load: true }
              })

        }
    }

    const handleChange = (e) => {
        setVerificationData({ ...verificationData, [e.target.name] : e.target.value });
    };
    
    return (
    images?.length == null ?
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      <CircularProgress/>
    </div>
      :
    <Container maxWidth="90vw">
    <div style={{paddingLeft: '2%', paddingRight: '2%', paddingBottom: '3%'}}>
        <div className={classes.pageTitle}>
            <Typography variant="h4">
               <b>Verification Form</b> 
            </Typography>
        </div>
        <div className={classes.labelContainer}>
            <div>
                <div className={classes.taskLabel}>
                    <Typography variant="h6">
                        {images[currentIndex]?.task[0]?.instruction}
                    </Typography>
                </div> 
                <div className={classes.imageContainer}>
                    <img
                        ref={imgEl} 
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                        src={ searchImage(annotatedStore[currentIndex].image[0], images) }
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
                                    handleChange={handleChange}
                                    type="text"
                                    label="Score"
                                    name="score"
                                    half
                                    value={verificationData.score}
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
                                handleChange={handleChange}
                                type="text"
                                label="Feedback"
                                name="feedback"
                                multiline
                                rows={10}
                                value={verificationData.feedback}
                            />
                        </div>

                        <div>
                            <BoundingBoxCriteria />
                        </div>

                    </div>
                    <div className={classes.submitButtonContainer}>
                        <div className={classes.imageCounter}>
                            <Typography variant="h4">
                                <b>{currentIndex+1}/{totalImage}</b>
                            </Typography>
                        </div>
                        <Button color="primary" variant="contained" className={classes.buttonContainer} onClick={handleButton}>
                            <Typography variant="h6">
                            {
                                currentIndex==totalImage-1?
                                <b>Submit</b> :
                                <b>Next</b>
                            }
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
    </div>
    </Container>
    )
};

export default VerificatorVerificationPage;
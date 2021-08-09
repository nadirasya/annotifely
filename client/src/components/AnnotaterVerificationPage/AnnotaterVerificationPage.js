import React, {useEffect, useRef, useState} from 'react';
import { Typography, Button, CircularProgress, TableHead, Table, TableRow, TableContainer, Paper, TableCell, withStyles, TableBody, TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles';
import { Annotorious } from '@recogito/annotorious';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input'
import createAnnotationObject from './createAnnotation';
import { createVerification, storeVerification, fetchVerification, getVerificationById } from '../../actions/verifications';

import '@recogito/annotorious/dist/annotorious.min.css';
import SelectBox from '../SelectBox';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#CFCFCF',
      color: theme.palette.primary.dark,
    },
    body: {
      fontSize: 14,
      textTransform: 'none',
    },
}))(TableCell);

const AnnotaterVerificationPage = props => {
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

    let images = useSelector((state) => state.images['allImage'])
    const annotatedStore = useSelector((state) => state.annotations['annotations'])
    const verifications = useSelector((state) => state.verifications)
    const currentIndex = location.state.index;
    const id = location.state.id;
    const totalImage = images?.length;
    const annotationsTemp = []

    useEffect(() => {
        if(annotatedStore[currentIndex]?._id !== undefined){
            dispatch(getVerificationById(annotatedStore[currentIndex]?._id))
        }
        console.log(verifications)
    },[annotatedStore, currentIndex])

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

        if(annotorious !== null)
        return () => annotorious.destroy();

    }, [images, currentIndex, verifications]);

    function searchImage(id, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i]._id === id) {
                // console.log("found", myArray[i]?.imageURL)
                return myArray[i]?.imageURL;
            }
        }
    }
    
    const handleButton = () => {
        if(currentIndex!=totalImage-1){
            history.push({
              pathname: '/annotater/verification',
              state: { id: id, index: currentIndex+1 }
            })
        } else {
            history.push('/annotater/my-annotation')

        }
    }

    const handleSelectBox = (box) => {
        anno.selectAnnotation(box.idBoundingBox)
    }

    return (
    images?.length == null || verifications.length == null?
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      <CircularProgress/>
    </div>
      :
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
                        {images[currentIndex]?.task[0]?.instruction}
                    </Typography>
                </div> 
                <div className={classes.imageContainer}>
                    <img
                        ref={imgEl} 
                        style={{maxWidth: '100%', height: '70vh'}}
                        src={ searchImage(annotatedStore[currentIndex].image[0], images) }
                        />
                    </div>
                </div>
                
            <div className={classes.rightContainer}>
                <div>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Typography variant="h6" className={classes.label} style={{marginRight: '5px'}}>
                                <b>Score </b>
                            </Typography>
                            <Typography variant="h6" className={classes.label} style={{marginRight: '5px', color: '#567068'}}>
                                 <b> { verifications[0]?.annotation.length !== null ? Math.round(verifications[0]?.annotation[0]?.totalScore) : " "} </b>
                            </Typography>
                            <Typography variant="h6" className={classes.label} >
                                out of <b>100</b>
                            </Typography>
                        </div>
                    </div>
                    <div style={{marginTop: '5px'}}>
                        <Typography><b>Criteria 1:</b> The bounding box not cropping any parts of the object </Typography>
                        <Typography><b>Criteria 2:</b> The bounding box must be as close as possible to the edge pixels of the object </Typography>
                    </div>
                    <TableContainer component={Paper} style={{ marginTop: '15px', marginBottom: '15px', maxHeight: '43vh' }}>
                        <Table stickyHeader className={classes.table} size="small" aria-label="sticky header">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{width: "10%", textAlign: "center"}}>
                                        <Typography variant="subtitle1"><b>ID</b></Typography>
                                    </StyledTableCell>
                                    <StyledTableCell style={{paddingLeft: 0}}>
                                        <Typography variant="subtitle1"><b>Status</b></Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    verifications[0]?.feedback?.map((box, index) => (
                                        <TableRow key={box._id}>
                                            <TableCell>
                                                <Button style={{paddingLeft: 0, paddingRight:0}} variant="contained" disableElevation onClick={() => handleSelectBox(box)}>
                                                    Box {index+1}
                                                </Button>
                                            </TableCell>
                                            <TableCell style={{paddingLeft: 0}}>
                                                <Typography><b>Criteria 1:</b></Typography>
                                                <SelectBox 
                                                    label1="Perfectly fit" 
                                                    label2="Cropped some parts of the object" 
                                                    label3="Cropped most parts of the object" 
                                                    label4="Object is incorrect"
                                                    disabled={true}
                                                    selected={box.criteria1}
                                                    index={index}/>
                                                <Typography><b>Criteria 2:</b></Typography>
                                                <SelectBox 
                                                    label1="Perfectly fit" 
                                                    label2="Far from the edge pixel" 
                                                    label3="Very far from the edge pixel" 
                                                    label4="Object is incorrect"
                                                    disabled={true}
                                                    selected={box.criteria2}
                                                    index={index}/>
                                                <Typography><b>Score: </b> {Math.round(box.score)}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{marginTop:"10px", flexDirection: 'row', display:'flex',}}>
                    { verifications[0]?.missedBoundingBox > 0 ? 
                        <Typography>You missed <b>{verifications[0]?.missedBoundingBox}</b> { verifications[0]?.missedBoundingBox === 1? 'bounding box' : 'bounding boxes'}  </Typography>: null
                    }
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
                            <b>Done</b> :
                            <b>Next</b>
                          }
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
        
    </div>
    
    )
};

export default AnnotaterVerificationPage;
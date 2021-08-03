import React, {useEffect, useRef, useState} from 'react';
import { Typography, Button, CircularProgress, Box, Container, TableHead, Table, TableRow, TableContainer, Paper, TableCell, withStyles, TableBody, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles';
import { Annotorious } from '@recogito/annotorious';
import { useDispatch, useSelector } from 'react-redux';
import createAnnotationObject from './createAnnotation';
import { createVerification, storeVerification, fetchVerification } from '../../actions/verifications';
import SelectBox from './SelectBox';

import '@recogito/annotorious/dist/annotorious.min.css';

// const initialState = { score: '', feedback: '' };

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

    let images = useSelector((state) => state.images['allImage'])
    const annotatedStore = useSelector((state) => state.annotations['annotations'])
    const verifications = useSelector((state) => state.verifications)
    const currentIndex = location.state.index;
    const id = location.state.id;
    const totalImage = images?.length;
    const annotationsTemp = []
    let boundingBoxes = annotatedStore[currentIndex]?.boundingBox;
    

    const generateInitialState = () => {
        const temp = []
        for(let i = 0; i < boundingBoxes?.length; i++){
            temp.push({criteria1: 0, criteria2: 0})
        }
        console.log("temp", temp, )
        setVerificationData(temp);
    }

    const [ verificationData, setVerificationData ] = useState();
    
    useEffect(() => {

        generateInitialState();
        console.log("verif", verificationData)


        let annotorious = null;

        if (imgEl.current && images !== undefined) {
          // Init
          annotorious = new Annotorious({
            image: imgEl.current,
            disableEditor: true,
            readOnly: true,
          });
          
          boundingBoxes?.map((box)=>{
            annotationsTemp.push(createAnnotationObject({id: box._id, label: images[currentIndex]?.task[0]?.label, x: box.x, y: box.y, width: box.width, height: box.height})) 
          })
          annotorious.setAnnotations(annotationsTemp);
        }
    
        // Keep current Annotorious instance in state
        setAnno(annotorious);

        if(annotorious !== null) {
        return () => annotorious.destroy();}
    }, [images, annotatedStore, currentIndex]);

    

    function searchImage(id, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i]._id === id) {
                return myArray[i]?.imageURL;
            }
        }
    }

    const handleButton = async() => {
        // if(currentIndex!=totalImage-1){
        //     dispatch(storeVerification(verificationData, annotatedStore[currentIndex]?._id));
        //     history.push({
        //       pathname: '/verificator/verification-page',
        //       state: { id: id, index: currentIndex+1 }
        //     })
        // } else {
        //     dispatch(fetchVerification())
        //     await verifications.push({ verificationData: verificationData, annotationId: annotatedStore[currentIndex]?._id})
        //     dispatch(createVerification(verifications))
        //     history.push({
        //         pathname: '/verificator',
        //         state: { load: true }
        //       })

        // }
        console.log("verificationData", verificationData)
    }


    const handleSelectBox = (box) => {
        console.log(box)
        console.log(verificationData)
        anno.selectAnnotation(box._id)
    }

    const handleCriteria1 = (event) => {
        let temp = verificationData
        temp[event.target.name].criteria1 = event.target.value
        setVerificationData(temp)
    }

    const handleCriteria2 = (event) => {
        let temp = verificationData
        temp[event.target.name].criteria2 = event.target.value
        setVerificationData(temp)
    }


    const handleChange = (e) => {
        setVerificationData({ ...verificationData, [e.target.name] : e.target.value });
    };
    
    return (
    images?.length == null || boundingBoxes?.length == 0 || verificationData === undefined?
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
                        <Typography style={{fontStyle: "italic"}}>Please give status based on the following criterias</Typography>
                        <Typography><b>Criteria 1:</b> The bounding box not cropping any parts of the object </Typography>
                        <Typography><b>Criteria 2:</b> The bounding box must be as close as possible to the edge pixels of the object </Typography>
                        <TableContainer component={Paper} style={{ maxHeight: '40vh', marginTop: '15px' }}>
                            <Table stickyHeader className={classes.table} size="small" aria-label="sticky header">
                                <TableHead>
                                    <TableRow style={{alignItems: "left"}} >
                                        <StyledTableCell>
                                            <Typography variant="subtitle1"><b>ID</b></Typography>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Typography variant="subtitle1"><b>Status</b></Typography>
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        boundingBoxes.map((box, index)=>{
                                            return (
                                            <TableRow key={box._id}>
                                                <TableCell>
                                                    <Button variant="contained" disableElevation onClick={() => handleSelectBox(box)}>
                                                        Box {index+1}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography><b>Criteria 1:</b></Typography>
                                                    <SelectBox 
                                                        label1="Perfectly fit" 
                                                        label2="Cropped some parts of the object" 
                                                        label3="Cropped most parts of the object" 
                                                        label4="Object is incorrect"
                                                        handleSelected={handleCriteria1}
                                                        index={index}/>
                                                    <Typography><b>Criteria 2:</b></Typography>
                                                    <SelectBox 
                                                        label1="Perfectly fit" 
                                                        label2="Far from the edge pixel" 
                                                        label3="Very far from the edge pixel" 
                                                        label4="Object is incorrect"
                                                        handleSelected={handleCriteria2}
                                                        index={index}/>
                                                </TableCell>
                                            </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{marginTop:"10px", flexDirection: 'row', display:'flex',}}>
                            <Typography>Total bounding boxes are <b>{boundingBoxes?.length}</b> from</Typography>
                            <TextField style={{width: "40px", marginLeft: "10px", marginRight: "10px"}}/>
                            <Typography>bounding boxes</Typography>
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
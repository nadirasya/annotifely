import React, {useEffect, useRef, useState} from 'react';
import { Typography, Button, CircularProgress, Box, Container, TableHead, Table, TableRow, TableContainer, Paper, TableCell, withStyles, TableBody, TextField} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles';
import { Annotorious } from '@recogito/annotorious';
import { useDispatch, useSelector } from 'react-redux';
import createAnnotationObject from './createAnnotation';
import { createVerification, storeVerification, fetchVerification } from '../../actions/verifications';
import SelectBox from '../SelectBox';
import { Prompt } from 'react-router-dom';
import ConfirmationForm from '../ConfirmationForm/ConfirmationForm';

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

    const imgEl = useRef();

    const [ anno, setAnno ] = useState();
    const [ tool, setTool ] = useState();
    const [ verificationData, setVerificationData ] = useState();
    const [ totalBox, setTotalBox ] = useState();
    const [ isPrompt, setIsPrompt] = useState(true);
    const [confirmation, setConfirmation] = useState(false);

    const images = useSelector((state) => state.images['allImage'])
    const annotatedStore = useSelector((state) => state.annotations['annotations'])
    const verifications = useSelector((state) => state.verifications)
    const currentIndex = location.state.index;
    const id = location.state.id;
    const totalImage = images?.length;
    const annotationsTemp = []
    let boundingBoxes = annotatedStore[currentIndex]?.boundingBox;
    
    useEffect(() => {

        generateInitialState();

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

    const generateInitialState = () => {
        const temp = []
        for(let i = 0; i < boundingBoxes?.length; i++){
            temp.push({criteria1: 0, criteria2: 0})
        }
        setVerificationData(temp);
        setTotalBox('');
    }

    function searchImage(id, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i]._id === id) {
                return myArray[i]?.imageURL;
            }
        }
    }

    const calculateScore = (num) => {
        let score = 0;

        if((num !== 4)){
            let boxScore = ((100*boundingBoxes.length)/totalBox)/2
            switch (num) {
                case 1:
                    score = boxScore;
                    break;
                case 2:
                    score = (boxScore*2)/3;
                    break;
                case 3:
                    score = boxScore/3;
                    break;
                default:
                    break;
            }
        } else {
            score = 0;
        }
        return score;
    }

    const handleCancel = () => {
        setConfirmation(false);
      }
  
      const handleClick = () => {
        setConfirmation(true);
      }

    const handleButton = async() => {
        await setConfirmation(false);
        let totalScore = 0;
        verificationData.map((data, index) => {
                    let score = 0
                    score += calculateScore(parseInt(data.criteria1))
                    score += calculateScore(parseInt(data.criteria2))
                    data.idBoundingBox = boundingBoxes[index]._id
                    data.score = score
                    totalScore += score
        })
        totalScore = totalScore/boundingBoxes.length
        const verificationTemp = {feedback: verificationData, annotationId: annotatedStore[currentIndex]?._id, totalScore, missedBoundingBox: totalBox-boundingBoxes.length}
        if(currentIndex!=totalImage-1){
            dispatch(storeVerification(verificationTemp));
            history.push({
            pathname: '/verificator/verification-page',
            state: { id: id, index: currentIndex+1 }
            })
        } 
        else {
            await setIsPrompt(false)
            dispatch(fetchVerification())
            await verifications.push({feedback: verificationData, annotationId: annotatedStore[currentIndex]?._id, totalScore, missedBoundingBox: totalBox-boundingBoxes.length})
            dispatch(createVerification(verifications))
            history.push({
                pathname: '/verificator',
                state: { load: true }
            })
        }
    }

    const handleSelectBox = (box) => {
        anno.selectAnnotation(box._id)
    }

    const handleCriteria1 = (event) => {
        let temp = verificationData;
        temp[parseInt(event.target.name)].criteria1 = event.target.value;
        setVerificationData(temp);
    }

    const handleCriteria2 = (event) => {
        let temp = verificationData;
        temp[parseInt(event.target.name)].criteria2 = event.target.value;
        setVerificationData(temp)
    }

    const handleTextField = e =>{
        setTotalBox(e.target.value)
    };

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setConfirmation(true)
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    
      /**
       * Component that alerts if you click outside of it
       */
    function OutsideAlerter(props) {
        const wrapperRef = useRef(null);
        useOutsideAlerter(wrapperRef);

        return (
        <Container component="main" maxWidth="xs">
            <div ref={wrapperRef} onClick={props.onClick}>{props.children}</div>
        </Container>
        )
    }
    
    return (
    <div>
        {   
            isPrompt === true ?
            <Prompt
            message={(location, action) => {
            if (action === 'POP') {
                console.log("Backing up...")
            }
        
            return location.pathname.startsWith("/verificator/verification-page")
                ? true
                :
                'Are you sure you want to leave?'
            }} />
            : null 
        }
        {
            confirmation === true ? 
            <div className={classes.popupContainer}>
                <OutsideAlerter>
                    <ConfirmationForm message="Are you sure with the given status?" handleClickCancel={handleCancel} handleClickConfirm={handleButton} confirmationForm={true}/>
                </OutsideAlerter>
            </div>
            : null
        }
        {
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
                                    style={{maxWidth: '100%', height: '70vh'}}
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
                                                <TableRow >
                                                    <StyledTableCell style={{width: "10%", textAlign: "center"}} >
                                                        <Typography variant="subtitle1"><b>ID</b></Typography>
                                                    </StyledTableCell>
                                                    <StyledTableCell style={{paddingLeft: 0}}>
                                                        <Typography variant="subtitle1"><b>Status</b></Typography>
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    boundingBoxes.map((box, index) => (
                                                        <TableRow key={box._id}>
                                                            <TableCell style={{marginLeft: 0, marginRight: 0, alignItems: "center"}}>
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
                                                                    handleSelected={handleCriteria1}
                                                                    // selected={1}
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
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <div style={{marginTop:"10px", flexDirection: 'row', display:'flex',}}>
                                        <Typography>Total bounding boxes are <b>{boundingBoxes?.length}</b> from</Typography>
                                        <TextField value={totalBox} style={{width: "40px", marginLeft: "10px", marginRight: "10px"}} onChange={handleTextField}/>
                                        <Typography>bounding boxes</Typography>
                                    </div>
                                </div>
                                <div className={classes.submitButtonContainer}>
                                    <div className={classes.imageCounter}>
                                        <Typography variant="h4">
                                            <b>{currentIndex+1}/{totalImage}</b>
                                        </Typography>
                                    </div>
                                    <Button color="primary" variant="contained" className={classes.buttonContainer} onClick={handleClick}>
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
        }
    </div>
    )
};

export default VerificatorVerificationPage;
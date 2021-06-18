import React, {useEffect, useRef, useState} from 'react';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles';
import boundingBoxLogo from '../images/bounding box.png';
import deleteLogo from '../images/delete.png';
import redoLogo from '../images/redo.png';
import undoLogo from '../images/undo.png';
import ToolsButton from './ToolsButton';
import { Annotorious } from '@recogito/annotorious';
import { useDispatch, useSelector } from 'react-redux';
import { nextImage } from '../../actions/images';


import '@recogito/annotorious/dist/annotorious.min.css';

const AnnotaterAnnotationPage = props => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch(); 


    // Ref to the image DOM element
    const imgEl = useRef();

    // The current Annotorious instance
    const [ anno, setAnno ] = useState();
    const [ selected, setSelected ] = useState();
    let images = useSelector((state) => state.images['allImage'])
    // const images = imagesState.allImage
    const currentIndex = location.state.index
    // const currentIndex = useSelector((state) => state.images['index']);
    // const currentIndex = 0
    const tag = 'test'
    const totalImage = images?.length;
    
    // Current drawing tool name
    const [ tool, setTool ] = useState();

    useEffect(() => {
      console.log(images)
        let annotorious = null;
        
        if (imgEl.current) {
          // Init
          annotorious = new Annotorious({
            image: imgEl.current,
            // disableEditor: true,
            // readOnly: true,
          });
          
        //   annotorious.setAnnotations(annotated);
          // Attach event handlers here
          annotorious.on('createSelection', async function(selection) {
    
            // Tag to insert
            selection.body = [{
              type: 'TextualBody',
              purpose: 'tagging',
              value: images[currentIndex]?.task[0]?.label
              // value: tag
            }];
          
            // Step 3: update the selection and save it
            await annotorious.updateSelected(selection);
            annotorious.saveSelected();
            console.log('selection', selection);
            // Alternative:
            // anno.updateSelected(selection, true);
          });
    
          annotorious.on('updateAnnotation', (annotation, previous) => {
            console.log('updated', annotation, previous);
          });
    
          annotorious.on('deleteAnnotation', annotation => {
            console.log('deleted', annotation);
          });

          annotorious.on('selectAnnotation', function(annotation) {
            console.log('selected', annotation);
            setSelected(annotation)
          });
        }
    
        // Keep current Annotorious instance in state
        setAnno(annotorious);
    
        // Cleanup: destroy current instance
        // return () => annotorious.destroy();
      }, [images]);


    // Toggles current tool + button label
    const toggleTool = () => {
        console.log("hey")
        setTool('rect');
        anno.setDrawingTool('rect');
    }

    const getAnnotation = () => {
        const annotations = anno.getAnnotations().forEach(function(element){
        console.log("selected", element.target.selector)})
        console.log('annotations', annotations)
      }
    
    const onDelete = () => {
      anno.removeAnnotation(selected)
        
    }

    const handleButton = () => {
      console.log('hello this is get', anno.getAnnotations())
      anno.destroy();
      if(currentIndex!=totalImage-1){
        // dispatch(nextImage());
        // history.push('/annotater/task/annotation')
      }
    }
    
    return (
    images?.length == null ?
      <CircularProgress/>
      :
    <div style={{paddingLeft: '5%', paddingRight: '2%', paddingBottom: '3%'}}>
        <div className={classes.pageTitle}>
            <Typography variant="h4">
               <b> My Annotations </b> 
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
                        // src="https://images.unsplash.com/photo-1557153416-3eb8fc6fb4c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        src={ images ? images[currentIndex]?.imageURL : null}
                        />
                    </div>
                </div>
                
            <div className={classes.rightContainer}>
                <div>
                    <div className={classes.taskLabel}>
                        <Typography variant="h6">
                            <b>Tools</b>
                        </Typography>
                    </div>
                    <div className={classes.toolsContainer}>
                      <ToolsButton image={boundingBoxLogo} label="Bounding Box" onClick={toggleTool}/>
                      <ToolsButton image={deleteLogo} label="Delete" onClick={onDelete} />
                      <ToolsButton image={undoLogo} label="Undo" />
                      <ToolsButton image={redoLogo} label="Redo" />
                    </div>
                </div>
                <div className={classes.submitButtonContainer}>
                    <div className={classes.imageCounter}>
                      <Typography variant="h4">
                        <b>1/{totalImage}</b>
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
    
    )
};

export default AnnotaterAnnotationPage;
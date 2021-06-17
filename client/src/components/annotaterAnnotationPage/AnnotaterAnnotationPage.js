import React, {useEffect, useRef, useState} from 'react';
import { Typography, Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom'
import useStyles from './styles';
import boundingBoxLogo from '../images/bounding box.png';
import deleteLogo from '../images/delete.png';
import redoLogo from '../images/redo.png';
import undoLogo from '../images/undo.png';
import ToolsButton from './ToolsButton';
import { Annotorious } from '@recogito/annotorious';

import '@recogito/annotorious/dist/annotorious.min.css';

const AnnotaterAnnotationPage = props => {
    const classes = useStyles();
    const location = useLocation();

    // Ref to the image DOM element
    const imgEl = useRef();

    // The current Annotorious instance
    const [ anno, setAnno ] = useState();
    const [ deleteAnnotation, setDeleteAnnotation ] = useState(false);
    const [ selected, setSelected ] = useState()
    const tag = "traffic light";

    // Current drawing tool name
    const [ tool, setTool ] = useState();
    
    console.log("re render", deleteAnnotation)

    useEffect(() => {
        let annotorious = null;
    
        if (imgEl.current) {
          // Init
          annotorious = new Annotorious({
            image: imgEl.current,
            disableEditor: true,
            // readOnly: true,
          });
          
        //   annotorious.setAnnotations(annotated);
          // Attach event handlers here
          annotorious.on('createSelection', async function(selection) {
    
            // Tag to insert
            selection.body = [{
              type: 'TextualBody',
              purpose: 'tagging',
              value: tag
            }];
          
            // Step 3: update the selection and save it
            // Remember that .updateSelected is an async function!
            // You need to wait until it completes before saving
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
        return () => annotorious.destroy();
      }, []);


    // Toggles current tool + button label
    const toggleTool = () => {
        console.log("hey")
        setTool('rect');
        anno.setDrawingTool('rect');
    }

    const getAnnotation = () => {
        const annotations = anno.getAnnotations().forEach(function(element){
        console.log("selected", element.target.selector)})
      }
    
    const onDelete = () => {
      console.log('hey this is delete', selected)
      anno.removeAnnotation(selected)
        
    }
    
    return (
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
                        Tandai tanda lalu lintas menggunakan bounding box 
                    </Typography>
                </div> 
                <div className={classes.imageContainer}>
                    <img
                        ref={imgEl} 
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                        src="https://images.unsplash.com/photo-1557153416-3eb8fc6fb4c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"/>
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
                        <b>1/12</b>
                      </Typography>
                    </div>
                    <Button color="primary" variant="contained" className={classes.buttonContainer}>
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

export default AnnotaterAnnotationPage;
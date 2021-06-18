import React, {useEffect, useRef, useState} from 'react';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles';
import boundingBoxLogo from '../images/bounding box.png';
import deleteLogo from '../images/delete.png';
import redoLogo from '../images/redo.png';
import undoLogo from '../images/undo.png';
import ToolsButton from './ToolsButton';
import createAnnotation from './createAnnotation';
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
    const [ histories, setHistories ] = useState({annotations: [], current: ''});
    let images = useSelector((state) => state.images['allImage'])
    const currentIndex = location.state.index;
    const id = location.state.id;
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
            disableEditor: true,
            // readOnly: true,
          });
          
          if(location.state?.type == "edit"){
              annotorious.setAnnotations(createAnnotation({id: 123, label: 'test', x: 0, y: 0, width: 300.891, height: 450.67}));
          }
          annotorious.on('createSelection', async function(selection) {
    
            // Tag to insert
            selection.body = [{
              type: 'TextualBody',
              purpose: 'tagging',
              value: images[currentIndex]?.task[0]?.label
            }];
          
            await annotorious.updateSelected(selection);
            annotorious.saveSelected();
            const currentAnnotation = annotorious.getAnnotations()
            const pushAnnotation = histories.annotations
            pushAnnotation.push(currentAnnotation);
            const index = pushAnnotation.length - 1;
            setHistories({['annotations']: pushAnnotation, ['current']: index})
          });
    
          annotorious.on('updateAnnotation', (annotation, previous) => {
            const currentAnnotation = annotorious.getAnnotations()
            const pushAnnotation = histories.annotations
            pushAnnotation.push(currentAnnotation);
            const index = pushAnnotation.length - 1;
            setHistories({['annotations']: pushAnnotation, ['current']: index})
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
      }, [images, currentIndex]);


    // Toggles current tool + button label
    const toggleTool = () => {
        console.log("hey")
        setTool('rect');
        anno.setDrawingTool('rect');
    }
    
    const onDelete = () => {
      anno.removeAnnotation(selected)
      const currentAnnotation = anno.getAnnotations()
      const pushAnnotation = histories.annotations
      pushAnnotation.push(currentAnnotation);
      const index = pushAnnotation.length - 1;
      setHistories({['annotations']: pushAnnotation, ['current']: index})
    }

    const onUndo = () => {
      anno.setAnnotations(histories.annotations[histories.current - 1])
      setHistories({...histories, ['current']: histories.current - 1})
    }

    const onRedo = () => {
      anno.setAnnotations(histories.annotations[histories.current + 1])
      setHistories({...histories, ['current']: histories.current + 1})
    }

    const handleButton = async() => {
      const annotations = await anno.getAnnotations().forEach(function(element, index){
        console.log(element);
        let value = element.target.selector.value;
        value = value.split(':')[1];
        console.log("value of ",index,  "is ", value)
        const x = value.split(',')[0];
        console.log("x: ", x)
        const y = value.split(',')[1];
        console.log("y: ", y)
        const width = value.split(',')[2];
        console.log("width: ", width)
        const height = value.split(',')[3];
        console.log("height: ", height)
      })
      await anno.destroy();
      if(currentIndex!=totalImage-1){
          history.push({
            pathname: '/annotater/task/annotation',
            state: { id: id, index: currentIndex+1 }
        })
      }
    }
    
    return (
    images?.length == null ?
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      <CircularProgress/>
    </div>
      :
    <div style={{paddingLeft: '5%', paddingRight: '2%', paddingBottom: '3%'}}>
        <div className={classes.pageTitle}>
            <Typography variant="h4">
               <b>{ location.state?.type == "edit"? "Edit" : null } Annotation Form</b> 
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
                        
                        src={ location.state?.type == "edit" ? 
                        "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        : images[currentIndex]?.imageURL }
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
                      <ToolsButton image={undoLogo} label="Undo" onClick={onUndo}/>
                      <ToolsButton image={redoLogo} label="Redo" onClick={onRedo}/>
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
    
    )
};

export default AnnotaterAnnotationPage;
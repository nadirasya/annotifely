import React, {useEffect, useRef, useState} from 'react';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles';
import boundingBoxLogo from '../images/bounding box.png';
import deleteLogo from '../images/delete.png';
import redoLogo from '../images/redo.png';
import undoLogo from '../images/undo.png';
import ToolsButton from './ToolsButton';
import createAnnotationObject from './createAnnotation';
import { Annotorious } from '@recogito/annotorious';
import { useDispatch, useSelector } from 'react-redux';
import { createAnnotation, storeAnnotations, fetchAnnotations } from '../../actions/annotations';


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

    const images = useSelector((state) => state.images['allImage'])
    const annotationStore = useSelector((state) => state.annotations['annotatedData'])
    const annotatedStore = useSelector((state) => state.annotations['annotations'])
    const currentIndex = location.state.index;
    const id = location.state.id;
    const totalImage = images?.length;
    const annotationsTemp = []
    // Current drawing tool name
    const [ tool, setTool ] = useState();

    useEffect(() => {
      // console.log(images[currentIndex]?._id)
        let annotorious = null;
        
        if (imgEl.current) {
          // Init
          annotorious = new Annotorious({
            image: imgEl.current,
            disableEditor: true,
            // readOnly: true,
          });
          
          if(location.state?.type == "edit"){
            annotatedStore[currentIndex]?.boundingBox?.map((box)=>{
              annotationsTemp.push(createAnnotationObject({id: box._id, label: images[currentIndex]?.task[0]?.label, x: box.x, y: box.y, width: box.width, height: box.height})) 
            })
            annotorious.setAnnotations(annotationsTemp);
            const currentAnnotation = annotationsTemp;
            const pushAnnotation = histories.annotations
            pushAnnotation.push(currentAnnotation);
            const index = pushAnnotation.length - 1;
            setHistories({['annotations']: pushAnnotation, ['current']: index})
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
      const annotationData = []
      const annotations = await anno.getAnnotations().forEach(function(element, index){
        let value = element.target.selector.value;
        value = value?.split(':')[1];
        const x = value?.split(',')[0];
        const y = value?.split(',')[1];
        const width = value?.split(',')[2];
        const height = value?.split(',')[3];
        const boundingBox = {x, y, width, height}
        annotationData.push(boundingBox)
      })
      // console.log("anno: ", anno.getAnnotations())
      await anno.destroy();
      if(currentIndex!=totalImage-1){
        dispatch(storeAnnotations(annotationData, images[currentIndex]?._id))
        history.push({
          pathname: '/annotater/task/annotation',
          state: { id: id, index: currentIndex+1 }
        })
      }
      else {
        await dispatch(fetchAnnotations());
        const annotationTemp = {annotationData, imageId: images[currentIndex]?._id}
        await annotationStore.push(annotationTemp)
        if(location.state?.type == "edit"){
          console.log("annotations edited", annotationStore)
          history.push({
            pathname: '/annotater/my-annotation',
            state: { load: true }
          })
        } else {
          console.log("created")
          // dispatch(createAnnotation(annotationStore))
          history.push({
            pathname: '/annotater/task',
            state: { load: true }
          })
        }
      }
      console.log("annotationStore", annotationStore)
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
                        
                        src={ images[currentIndex]?.imageURL }
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
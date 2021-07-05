import { CREATE_ANNOTATION, FETCH_ANNOTATION, STORE_ANNOTATION, GET_ANNOTATION, FETCH_ANNOTATION_BY_ID, CLEANUP_ANNOTATION } from '../constants/actionTypes';

import * as api from '../api';
import moment from 'moment';

export const createAnnotation = (annotationStore) =>  async(dispatch) => {
    try {
        await api.createAnnotation({annotationsData: annotationStore});

        dispatch({ type: CREATE_ANNOTATION });
    } catch (error) {
        console.log(error);
    }
}

export const editAnnotation = (annotationStore, id) => async(dispatch) => {
    try {
        const {data} = await api.editnnotation({annotationsData: annotationStore}, id)

        dispatch({ type: CREATE_ANNOTATION, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const storeAnnotations = (annotationData, imageId) => async(dispatch) => {
    const annotation = {annotationData, imageId};
    dispatch({ type: STORE_ANNOTATION, payload: annotation })
}

export const fetchAnnotations = () => async(dispatch) => {
    dispatch({ type: FETCH_ANNOTATION });
}

export const cleanupAnnotations = () => async(dispatch) => {
    dispatch({ type: CLEANUP_ANNOTATION });
}

export const getAnnotations = () => async (dispatch) => {
    const currentDate = moment()
    const annoTemp = []
    try{
        let { data } = await api.fetchAnnotations();
        if ( data )
        console.log({data});
        data.map((annotation) => {
            const taskId = annotation.task[0]._id;
            const annotaterId = annotation.annotater[0]._id;
            const check = annoTemp.some(function(anno){ return (anno.annotater[0]._id === annotaterId  && anno.task[0]._id === taskId ) });
            if(check === false){
                const createdDate = moment(annotation?.task?.createdAt);
                annotation['submitted'] = currentDate.diff(createdDate, 'days');
                annoTemp.push(annotation);
            }
        })
        data = annoTemp;
        dispatch({ type: GET_ANNOTATION, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getAnnotationByIdTask = (id, annotaterId) => async(dispatch) => {
    try {
        const { data } = await api.getAnnotationByIdTask(id, annotaterId);
        dispatch({ type: FETCH_ANNOTATION_BY_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getAnnotationByIdAnnotater = (annotaterId) => async(dispatch) => {
    try {
        const { data } = await api.getAnnotationByIdAnnotater(annotaterId);

        console.log("data", data);
    } catch (error) {
        
    }
}
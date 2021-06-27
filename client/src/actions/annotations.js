import { CREATE_ANNOTATION, FETCH_ANNOTATION, STORE_ANNOTATION, GET_ANNOTATION, FETCH_ANNOTATION_BY_ID } from '../constants/actionTypes';

import * as api from '../api';
import moment from 'moment';

export const createAnnotation = (annotationStore) =>  async(dispatch) => {
    try {
        const { data } = await api.createAnnotation({annotationsData: annotationStore});

        dispatch({ type: CREATE_ANNOTATION, payload: data });
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

export const getAnnotations = () => async (dispatch) => {
    const currentDate = moment()
    const annoTemp = []
    try{
        let { data } = await api.fetchAnnotations();
        if ( data )
        console.log({data});
        data.map((annotation) => {
            const taskId = annotation.task[0]._id
            const annotaterId = annotation.annotater[0]._id
            console.log("task", taskId, " annotater", annotaterId)
            const check = annoTemp.some((anno) => anno.task[0]._id === taskId && anno.annotater[0]._id === annotaterId)
            if(check === false){
                console.log("false")
                const createdDate = moment(annotation?.task?.createdAt);
                annotation['submitted'] = currentDate.diff(createdDate, 'days');
                annoTemp.push(annotation);
            } else {
                console.log("true");
            }
        })
        console.log("annoTemp", annoTemp)
        // data = annoTemp;
        dispatch({ type: GET_ANNOTATION, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getAnnotationByIdTask = (id, annotaterId) => async(dispatch) => {
    try {
        const { data } = await api.getAnnotationByIdTask(id, annotaterId);
        console.log("data from action", data)
        dispatch({ type: FETCH_ANNOTATION_BY_ID, payload: data })
    } catch (error) {
        console.log(error);
    }
}
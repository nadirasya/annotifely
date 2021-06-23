import { CREATE_ANNOTATION, FETCH_ANNOTATION, STORE_ANNOTATION, GET_ANNOTATION } from '../constants/actionTypes';

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

export const storeAnnotations = (annotationData, imageId) => async(dispatch) => {
    const annotation = {annotationData, imageId};
    console.log("annotation action ", annotation)
    dispatch({ type: STORE_ANNOTATION, payload: annotation })
}

export const fetchAnnotations = () => async(dispatch) => {
    console.log("this is dispatch")
    dispatch({ type: FETCH_ANNOTATION });
}

export const getAnnotations = () => async (dispatch) => {
    console.log("this is get")
    const currentDate = moment()
    
    try{
        const { data } = await api.fetchAnnotations();
        if ( data )
        console.log({data});
        data.map((annotation) => {
            //Calculate time difference
            const createdDate = moment(annotation?.task?.createdAt);
            annotation['submitted'] = currentDate.diff(createdDate, 'days');
        })
    
        dispatch({ type: GET_ANNOTATION, payload: data });
    } catch (error) {
        console.log(error);
    }
}
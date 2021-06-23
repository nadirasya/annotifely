import { CREATE_ANNOTATION, FETCH_ALL } from '../constants/actionTypes';

import * as api from '../api';
import moment from 'moment';

export const createAnnotation = (annotationData, imageId) =>  async(dispatch) => {
    try {
        const annotation = {annotationData, imageId}
        const { data } = await api.createAnnotation(annotation);

        dispatch({ type: CREATE_ANNOTATION, data });
    } catch (error) {
        console.log(error);
        
    }
}

export const getAnnotations = () => async (dispatch) => {

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
    
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}
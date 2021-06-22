import { CREATE_ANNOTATION } from '../constants/actionTypes';

import * as api from '../api';

export const createAnnotation = (annotationData) =>  async(dispatch) => {
    try {
        const { data } = await api.createAnnotation(annotationData);

        dispatch({ type: CREATE_ANNOTATION, data });
    } catch (error) {
        console.log(error);
        
    }
}

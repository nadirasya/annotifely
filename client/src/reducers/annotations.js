import { CREATE_ANNOTATION, FETCH_ANNOTATION } from '../constants/actionTypes';

export default (annotations = [], action) => {
    switch(action.type){
        case CREATE_ANNOTATION:
            return [...annotations, action.payload];
        case FETCH_ANNOTATION:
            return action.payload;
        default:
            return annotations;
    }
}
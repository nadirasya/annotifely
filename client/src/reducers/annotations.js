import { CREATE_ANNOTATION, STORE_ANNOTATION, GET_ANNOTATION, FETCH_ANNOTATION } from '../constants/actionTypes';

export default (annotations = [], action) => {
    switch(action.type){
        case CREATE_ANNOTATION:
            return [...annotations, action.payload];
        case STORE_ANNOTATION:
            return [...annotations, action.payload];
        case GET_ANNOTATION:
            return action.payload;
        case FETCH_ANNOTATION:
            return annotations;
        default:
            return annotations;
    }
}
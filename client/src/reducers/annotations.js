import { CREATE_ANNOTATION, FETCH_ALL } from '../constants/actionTypes';

export default (annotations = [], action) => {
    switch(action.type){
        case CREATE_ANNOTATION:
            return [...annotations, action.payload];
        case FETCH_ALL:
            return action.payload;
        default:
            return annotations;
    }
}
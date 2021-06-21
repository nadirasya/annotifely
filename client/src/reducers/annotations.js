import { CREATE_ANNOTATION } from '../constants/actionTypes';

export default (annotations = [], action) => {
    switch(action.type){
        case CREATE_ANNOTATION:
            return [...annotations, action.payload];
        default:
            return annotations;
    }
}
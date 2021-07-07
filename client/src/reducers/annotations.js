import { CREATE_ANNOTATION, STORE_ANNOTATION, GET_ANNOTATION, FETCH_ANNOTATION, FETCH_ANNOTATION_BY_ID, CLEANUP_ANNOTATION, GET_ANNOTATION_BY_ID } from '../constants/actionTypes';

export default (annotationStore = { annotatedData: [], annotations: [] }, action) => {
    switch(action.type){
        case CREATE_ANNOTATION:
            annotationStore["annotatedData"] = []
            return annotationStore;
        case STORE_ANNOTATION:
            let annotatedDataTemp = annotationStore["annotatedData"]
            annotatedDataTemp = [...annotatedDataTemp, action.payload]
            annotationStore["annotatedData"] = annotatedDataTemp
            return annotationStore;
        case GET_ANNOTATION:
            annotationStore["annotatedData"] = action.payload
            return annotationStore;
        case GET_ANNOTATION_BY_ID: 
            annotationStore['annotations'] = action.payload
            return annotationStore;
        case FETCH_ANNOTATION:
            return annotationStore;
        case FETCH_ANNOTATION_BY_ID:
            annotationStore['annotations'] = action.payload
            return annotationStore;
        case CLEANUP_ANNOTATION: 
            annotationStore["annotatedData"] = []
            return annotationStore;
        default:
            return annotationStore;
    }
}
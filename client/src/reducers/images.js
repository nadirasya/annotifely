import { FETCH_IMAGES, NEXT_IMAGE } from '../constants/actionTypes';

export default (images = [], action) => {
    switch(action.type){
        case FETCH_IMAGES:
            images['allImage']=action.payload
            images['index']=0
            return images;
        case NEXT_IMAGE:
            return images['index']+=1
        default:
            return images;
    }
}
        
import { CREATE_VERIFICATION } from '../constants/actionTypes';

export default (verifications = [], action) => {
    switch(action.type){
        case CREATE_VERIFICATION:
            return action.payload;
        default:
            return verifications;
    }
}
        
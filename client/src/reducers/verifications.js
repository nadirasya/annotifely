import { CREATE_VERIFICATION, STORE_VERIFICATION, GET_VERIFICATION } from '../constants/actionTypes';

export default (verifications = [], action) => {
    switch(action.type){
        case CREATE_VERIFICATION:
            return verifications = [];
        case STORE_VERIFICATION:
            return [...verifications, action.payload];
        case GET_VERIFICATION:
            return verifications;
        default:
            return verifications;
    }
}
        
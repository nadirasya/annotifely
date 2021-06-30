import { CREATE_VERIFICATION, STORE_VERIFICATION, GET_VERIFICATION, GET_VERIFICATION_BY_ID } from '../constants/actionTypes';

export default (verifications = [], action) => {
    switch(action.type){
        case CREATE_VERIFICATION:
            return verifications = [];
        case STORE_VERIFICATION:
            return [...verifications, action.payload];
        case GET_VERIFICATION:
            return verifications;
        case GET_VERIFICATION_BY_ID:
            return verifications = action.payload;
        default:
            return verifications;
    }
}
        
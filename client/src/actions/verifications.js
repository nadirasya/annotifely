import { CREATE_VERIFICATION, STORE_VERIFICATION, GET_VERIFICATION } from '../constants/actionTypes';
import * as api from '../api';

export const createVerification = (verificationData) => async(dispatch) => {
    try {
        console.log("hello this is action")
        const { data } = await api.createVerification(verificationData);
        
        dispatch({ type: CREATE_VERIFICATION, data });
    } catch (error) {
        console.log(error);   
    }
}

export const storeVerification = (verificationData, annotationId) => async(dispatch) => {
    const annotation = {verificationData, annotationId};
    dispatch({ type: STORE_VERIFICATION, payload: annotation })
}

export const fetchVerification = () => async(dispatch) => {
    dispatch({ type: GET_VERIFICATION });
}

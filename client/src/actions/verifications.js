import { CREATE_VERIFICATION, STORE_VERIFICATION, GET_VERIFICATION, GET_VERIFICATION_BY_ID } from '../constants/actionTypes';
import * as api from '../api';

export const createVerification = (verificationData) => async(dispatch) => {
    try {
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

export const getVerificationById = (annotationId) => async(dispatch) => {
    try {
        const { data } = await api.getVerificationById(annotationId);
        dispatch({ type: GET_VERIFICATION_BY_ID, payload: data });
    } catch (error) {
        console.log(error);   
    }
}
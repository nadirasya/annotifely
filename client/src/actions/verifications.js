import { CREATE_VERIFICATION } from '../constants/actionTypes';
import * as api from '../api';
import moment from 'moment';

export const createVerification = (score, feedback, imageId) => async(dispatch) => {
    try {
        const { data } = await api.createVerification(score, feedback, imageId);

        dispatch({ type: CREATE_VERIFICATION, data });
    } catch (error) {
        console.log(error);
        
    }
}
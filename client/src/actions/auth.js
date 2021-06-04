import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signinAnnotater = (formData, history) =>  async(dispatch) => {
    try {
        const { data } = await api.signinAnnotater(formData);

        dispatch({ type: AUTH, data });

        history.push('/annotater');
    } catch (error) {
        console.log(error);
        
    }
}

export const signinClient = (formData, history) =>  async(dispatch) => {
    try {
        const { data } = await api.signinClient(formData);

        dispatch({ type: AUTH, data });

        history.push('/client');
    } catch (error) {
        console.log(error);
        
    }
}

export const signinVerificator = (formData, history) =>  async(dispatch) => {
    try {
        const { data } = await api.signinVerificator(formData);

        dispatch({ type: AUTH, data });

        history.push('/verificator');
    } catch (error) {
        console.log(error);
        
    }
}

export const signup = (formData, history) =>  async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        
        dispatch({ type: AUTH, data });

        history.push('/annotater');
    } catch (error) {
        console.log(error);
    }
}

import  { FECTH } from '../constants/actionTypes';
import * as api from '../api'

export const getClientTask = () => async (dispatch) => {
    try{
        const { data } = await api.fetchClientTasks();
        // console.log(data);
        dispatch({ type: FECTH, payload: data });
    } catch (error) {
        console.log(error);
    }
}
import { FETCH_ALL } from '../constants/actionTypes';
import * as api from '../api';


export const getTasks = () => async (dispatch) => {
    try{
        const { data } = await api.fetchTasks();
        // console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
    
}
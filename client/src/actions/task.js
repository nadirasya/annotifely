import { CREATE } from '../constants/actionTypes';
import * as api from '../api';

export const createTask = (taskData, history) =>  async(dispatch) => {
    try {
        const { data } = await api.createTask(taskData);

        dispatch({ type: CREATE, data });

        history.push('/client');
    } catch (error) {
        console.log(error);
        
    }
}
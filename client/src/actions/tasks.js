import { FETCH_ALL, CREATE, FETCH_IMAGES } from '../constants/actionTypes';
import * as api from '../api';
import moment from 'moment';


export const getTasks = () => async (dispatch) => {
    const currentDate = moment()
    try{
        const { data } = await api.fetchTasks();
        await data.map(async(task) => {
            const createdDate = moment(task.createdAt);
            task['timeRemaining'] =  currentDate.diff(createdDate, 'days');
        })
        // console.log(data)
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getTasksById = (id) => async(dispatch) => {
    try {
        const { data } = await api.getTasksById(id);
        console.log("this is actions", data)
        dispatch({ type: FETCH_IMAGES, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getClientTask = () => async (dispatch) => {
    // const currentDate = new Date();
    const currentDate = moment()
    
    try{
        const { data } = await api.fetchClientTasks();
        data.map((task) => {
            //Calculate time difference 
            const createdDate = moment(task.createdAt);
            task['timeRemaining'] =  task.timeSpan - currentDate.diff(createdDate, 'days');
        })
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createTask = (taskData, history) =>  async(dispatch) => {
    try {
        const { data } = await api.createTask(taskData);

        dispatch({ type: CREATE, data });

        history.push('/client');
    } catch (error) {
        console.log(error);
        
    }
}

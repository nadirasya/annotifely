import { FETCH_ALL, CREATE, FETCH_IMAGES, FETCH_TASK, UPDATE_TIME } from '../constants/actionTypes';
import * as api from '../api';
import moment from 'moment';


export const getTasks = (id) => async (dispatch) => {
    const currentDate = moment()
    const availableTask = []
    try{
        const { data } = await api.fetchTasks();
        data.map((task, index) => {
            //Calculate time difference
            const checkAnnotater = task.totalAnnotater.some((annotaterId) => annotaterId === id)
           if (checkAnnotater === false){
                task.totalAnnotater=task.totalAnnotater.length
                const createdDate = moment(task.createdAt);
                task['timeRemaining'] = currentDate.diff(createdDate, 'days');
                availableTask.push(task);
           } 
           return availableTask;
        })
        dispatch({ type: FETCH_ALL, payload: availableTask });
    } catch (error) {
        console.log(error);
    }
}

export const getAnnotaterTask = (id) => async (dispatch) => {
    const currentDate = moment()
    const finishedTask = []
    try{
        const { data } = await api.fetchTasks();
        data.map((task, index) => {
            //Calculate time difference
            const checkAnnotater = task.totalAnnotater.some((annotaterId) => annotaterId === id)
           if (checkAnnotater === true){
                task.totalAnnotater=task.totalAnnotater.length
                const createdDate = moment(task.createdAt);
                task['timeRemaining'] =  task.timeSpan - currentDate.diff(createdDate, 'days');
                finishedTask.push(task)
           }
           return finishedTask
        })
        dispatch({ type: FETCH_TASK, payload: finishedTask });
    } catch (error) {
        console.log(error);
    }
}

export const getTasksById = (id) => async(dispatch) => {
    try {
        const { data } = await api.getTasksById(id);
        dispatch({ type: FETCH_IMAGES, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getClientTask = () => async (dispatch) => {

    const currentDate = moment()
    
    try{
        const { data } = await api.fetchClientTasks();
        data.map((task) => {
            //Calculate time difference
            const createdDate = moment(task.createdAt);
            task['timeRemaining'] =  task.timeSpan - currentDate.diff(createdDate, 'days');
            task.totalAnnotater=task.totalAnnotater.length
            return task;
        })

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createTask = (taskData, history) => async(dispatch) => {
    try {
        const { data } = await api.createTask(taskData);

        dispatch({ type: CREATE, data });
    } catch (error) {
        console.log(error);
        
    }
}

export const updateTime = (timespan, id) => async(dispatch) => {
    try {
        console.log(timespan, id)
        const { data } = await api.updateTime({timespan: timespan}, id);

        dispatch({ type: UPDATE_TIME, data });
    } catch (error) {
        console.log(error);
    }
}

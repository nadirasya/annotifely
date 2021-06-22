import { FETCH_ALL, CREATE, FETCH_TASK, UPDATE_TIME } from '../constants/actionTypes';

export default (tasks = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case FETCH_TASK: 
            return action.payload;
        case CREATE:
            return [...tasks, action.payload];
        case UPDATE_TIME:
            return action.payload;
        default:
            return tasks;
    }
}
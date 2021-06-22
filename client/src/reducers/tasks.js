import { FETCH_ALL, CREATE, FETCH_TASK } from '../constants/actionTypes';

export default (tasks = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case FETCH_TASK: 
            return action.payload;
        case CREATE:
            return [...tasks, action.payload];
        default:
            return tasks;
    }
}
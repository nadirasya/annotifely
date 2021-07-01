import { FETCH_ALL, CREATE, FETCH_TASK, UPDATE_TIME } from '../constants/actionTypes';

export default (tasks = {taskList: [], total: ''}, action) => {
    switch(action.type){
        case FETCH_ALL:
            tasks['taskList'] = action.payload.availableTask;
            tasks['total'] = action.payload.totalTask;
            return tasks;
        case FETCH_TASK: 
            return tasks['taskList'] = action.payload;
        case CREATE:
            let taskTemp = tasks['taskList']
            taskTemp = [...taskTemp, action.payload]
            tasks['taskList'] = taskTemp;
            return tasks;
        case UPDATE_TIME:
            return tasks['taskList'] = action.payload;
        default:
            return tasks;
    }
}
import { FETCH_ALL } from '../constants/actionTypes';

export default (tasks = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            console.log('this is reducer', action.payload)
            return action.payload;
        default:
            return tasks;
    }
}
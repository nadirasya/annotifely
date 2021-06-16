import { FETCH_ALL } from '../constants/actionTypes';

export default (tasks = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            // console.log(action.payload)
            return action.payload;
        default:
            return tasks;
    }
}
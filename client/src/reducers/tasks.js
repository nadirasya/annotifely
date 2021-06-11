import { FECTH } from '../constants/actionTypes';

export default (tasks = [], action) => {
    switch (action.type) {
        case FECTH :
            console.log('this is reducer', action.payload)
            return action.payload;
        default:
            return tasks;
    }
}
import { FETCH_CLIENT } from '../constants/actionTypes';

export default (clients = [], action) => {
    switch(action.type){
        case FETCH_CLIENT:
            return action.payload;
        default:
            return clients;
    }
}
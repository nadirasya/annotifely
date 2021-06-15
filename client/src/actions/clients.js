import { FETCH_CLIENT } from '../constants/actionTypes';

import * as api from '../api';

export const getClients = () => async (dispatch) => {
    try{
        const { data } = await api.getClients();
        // console.log("this is action",data)
        dispatch({ type: FETCH_CLIENT, payload: data });
    } catch (error) {
        console.log(error);
    }
}
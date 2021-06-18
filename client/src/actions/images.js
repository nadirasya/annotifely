import { NEXT_IMAGE } from '../constants/actionTypes';
import * as api from '../api';
import moment from 'moment';


export const nextImage = () => async (dispatch) => {
    dispatch({ type: NEXT_IMAGE });
}

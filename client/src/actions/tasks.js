import { FETCH_ALL, CREATE } from '../constants/actionTypes';
import * as api from '../api';
import moment from 'moment';


export const getTasks = () => async (dispatch) => {
    const currentDate = moment()
    try{
        const { data } = await api.fetchTasks();
        let clients = await api.getClients();
        clients = clients.data
        await data.map(async(task) => {
            // console.log("clients", clients)
            //Calculate time difference 
            const createdDate = moment(task.createdAt);
            task['timeRemaining'] =  currentDate.diff(createdDate, 'days');
            //Get client name
            const clientFound = clients.find(client=>client._id==task.idClient)
            task['clientName'] = clientFound.name
            // console.log('here')
            // const client = await api.getClientById(task.idClient)
            // task['clientName'] = client.data.name
        })
        console.log(data)
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const getClientTask = () => async (dispatch) => {
    // const currentDate = new Date();
    const currentDate = moment()
    
    try{
        const { data } = await api.fetchClientTasks();
        data.map((task) => {
            //Calculate time difference 
            const createdDate = moment(task.createdAt);
            task['timeRemaining'] =  task.timeSpan - currentDate.diff(createdDate, 'days');
        })
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createTask = (taskData, history) =>  async(dispatch) => {
    try {
        const { data } = await api.createTask(taskData);

        dispatch({ type: CREATE, data });

        history.push('/client');
    } catch (error) {
        console.log(error);
        
    }
}
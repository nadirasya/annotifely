import axios from 'axios';

const API = axios.create({ baseURL:  'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signinAnnotater = (formData) => API.post('/users/signinAnnotater', formData);
export const signinClient = (formData) => API.post('/users/signinClient', formData);
export const signinVerificator = (formData) => API.post('/users/signinVerificator', formData);
export const signupClient = (formData) => API.post('/users/signupClient', formData);
export const signupAnnotater = (formData) => API.post('/users/signupAnnotater', formData);

export const fetchClientTasks = () => API.get('/client/getClientTask');
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

export const createTask = (taskData) => API.post('/tasks/createTask', taskData);
export const fetchTasks = () => API.get('/tasks');
export const fetchClientTasks = () => API.get('/clients/getClientTasks');
export const updateTime = (timespan, id) => API.put(`tasks/updateTime/${id}`, timespan);

export const getClientById = (idClient) => API.get(`/tasks/getClientById/${idClient}`)
export const getClients = () => API.get('/clients')
export const getTasksById = (id) => API.get(`/tasks/getTasksById/${id}`)
export const getTotalImage = (id) => API.get(`/images/total/${id}`)

export const createAnnotation = (annotationData) => API.post('/annotations/createAnnotation', annotationData); 
export const fetchAnnotations = () => API.get('/annotations/getAnnotation');
export const getAnnotationByIdTask = (id, annotaterId) => API.get(`/annotations/getAnnotationByIdTask/${id}`, {params: {annotaterId}})

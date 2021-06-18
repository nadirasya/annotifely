import { combineReducers } from 'redux';

import auth from './auth';
import tasks from './tasks';
import clients from './clients';
import images from './images';

export const reducers = combineReducers({ auth, tasks, clients, images });

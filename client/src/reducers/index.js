import { combineReducers } from 'redux';

import auth from './auth';
import tasks from './tasks';
import clients from './clients';
import images from './images';
import annotations from './annotations';
import verifications from './verifications';

export const reducers = combineReducers({ auth, tasks, clients, images, annotations, verifications });

import { combineReducers } from 'redux';

import auth from './auth';
import tasks from './tasks';
import clients from './clients';

export const reducers = combineReducers({ auth, tasks, clients });

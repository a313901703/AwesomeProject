import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import queryString from 'query-string';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import * as axiosMiddlewareOptions from './axiosMiddlewareOptions'
import rootReducer from './components/common/reducers'
import { getIdentity } from './components/common/func'

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL:'http://www.dev.com/api/v1/',
    responseType: 'json',
    headers:{
        'Content-Type' : 'application/json'
    }
});

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    axiosMiddleware(client,{...axiosMiddlewareOptions})
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
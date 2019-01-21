import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { createRootReducer, createAllReducers } from '../reducers';

export const history = createBrowserHistory();

const rootReducer = createRootReducer(createAllReducers(history));

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

export default store;
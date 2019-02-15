import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { createBrowserHistory } from 'history';
import refreshToken from '../middlewares/refreshTokenMiddleware';
import { createRootReducer, createAllReducers } from '../reducers';

export const history = createBrowserHistory();

const rootReducer = createRootReducer(createAllReducers(history));

const store = createStore(
    enableBatching(rootReducer),
    applyMiddleware(refreshToken, thunk, logger)
);

export default store;
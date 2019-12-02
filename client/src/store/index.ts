import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createTracker } from 'redux-segment';
import { createBrowserHistory } from 'history';
import rootReducer from './rootReducer';
import * as LogRocket from 'logrocket';

export const tracker = createTracker();
export const history = createBrowserHistory();

const middleware = applyMiddleware(
  thunk,
  routerMiddleware(history),
  tracker,
  LogRocket.reduxMiddleware()
);
const store = createStore(connectRouter(history)(rootReducer), composeWithDevTools(middleware));

export default store;

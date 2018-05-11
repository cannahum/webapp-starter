import {
  createStore, combineReducers, applyMiddleware, Store, Reducer, Middleware, compose,
  StoreEnhancer,
} from 'redux';
import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { History as HHistory } from 'history'; // History in the browser is different. Use this one for types.
import { CounterReducer as counter, ICounterReducer } from './reducers/counter';
import { authReducer as auth, IAuthState } from './reducers/auth';

export interface IApplicationState {
  counter: ICounterReducer;
  auth: IAuthState;
  router: RouterState;
}

const reducers: Reducer<IApplicationState> = combineReducers<IApplicationState>({
  counter,
  auth,
  router: routerReducer as Reducer<RouterState>, // Why do I need this????!
});

// React-Router-Redux
// Create a history of your choosing (we're using a browser history in this case)
export const history: HHistory = createHistory();

function shouldShowReduxDevTools(): boolean {
  return typeof window === 'object'
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    && process.env.NODE_ENV === 'development';
}

// Redux Dev Tools - This is complicated. https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers: (params: any) => StoreEnhancer = shouldShowReduxDevTools()
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// Put together all the enhancers
const middlewares: Middleware[] = [
  routerMiddleware(history),
];
const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

export const store: Store<IApplicationState> = createStore(reducers, enhancer);

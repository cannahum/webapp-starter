import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  Reducer,
  Middleware,
  compose,
  StoreEnhancer,
} from 'redux';
import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { History as HHistory } from 'history'; // History in the browser is different. Use this one for types.
import { counterReducer as counter, ICounterReducer } from './reducers/counter';

export interface IApplicationState {
  counter: ICounterReducer;
  router: RouterState;
}

const reducers: Reducer<IApplicationState> = combineReducers<IApplicationState>({
  counter,
  router: routerReducer as Reducer<RouterState>, // Why do I need this????!
});

function shouldShowReduxDevTools(): boolean {
  return typeof window === 'object'
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    && process.env.NODE_ENV === 'development';
}

// Redux Dev Tools - This is complicated. https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers: (params: any) => StoreEnhancer = shouldShowReduxDevTools()
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

export const storeCreator = (history: HHistory): Store<IApplicationState> => {
  // Put together all the enhancers
  const middlewares: Middleware[] = [
    routerMiddleware(history),
  ];
  const enhancer: StoreEnhancer = composeEnhancers(
    applyMiddleware(...middlewares),
  );
  return createStore(reducers, enhancer);
};

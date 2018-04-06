import {createStore, combineReducers, Store, Reducer} from 'redux';
import {CounterReducer as counter, ICounterReducer} from './reducers/counter';
import {LinkReducer as link, ILinkReducer} from './reducers/link';

export interface IReducers {
  counter: ICounterReducer;
  link: ILinkReducer;
}

const reducers: Reducer<IReducers> = combineReducers({
  counter,
  link,
});

export const store: Store<IReducers> = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

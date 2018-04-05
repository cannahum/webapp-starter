import {createStore, combineReducers, Store, Reducer} from 'redux';
import {CounterReducer as counter, ICounterReducer} from './reducers/counter';

interface IReducers {
  counter: ICounterReducer;
}

const reducers: Reducer<IReducers> = combineReducers({
  counter,
});

export const store: Store<IReducers> = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

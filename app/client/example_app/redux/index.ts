import { createStore, combineReducers, Store, Reducer } from 'redux';
import { CounterReducer as counter, ICounterReducer } from './reducers/counter';
import { authReducer as auth, IAuthReducer } from './reducers/auth';

export interface IReducers {
  counter: ICounterReducer;
  auth: IAuthReducer;
}

const reducers: Reducer<IReducers> = combineReducers({
  counter,
  auth,
});

export const store: Store<IReducers> = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

import {Reducer} from 'redux';
import {CounterTypes, isCounterActionType} from '../actions/counter';

export interface ICounterReducer {
  counter: number;
}

const initialState = () => ({
  counter: 0,
});

const CounterReducer: Reducer<ICounterReducer> = (state = initialState(), action: any): ICounterReducer => {
  if (isCounterActionType(action)) {
    let effectiveX = action.payload;
    if (action.type === CounterTypes.DECREMENT) {
      effectiveX *= -1;
    }
    return {
      ...state,
      counter: state.counter + effectiveX,
    };
  }
  else {
    return state;
  }
};

export {CounterReducer};

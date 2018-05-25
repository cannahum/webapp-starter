import { AnyAction, Reducer } from 'redux';
import { CounterTypes } from '../actions/counter';

export interface ICounterReducer {
  counter: number;
}

const initialState = () => ({
  counter: 0,
});

const counterReducer: Reducer<ICounterReducer> = (state = initialState(), action: AnyAction): ICounterReducer => {
  const { type } = action;

  switch (type) {
    case CounterTypes.INCREMENT: {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    case CounterTypes.DECREMENT: {
      return {
        ...state,
        counter: state.counter - 1,
      };
    }
    default: {
      return state;
    }
  }
};

export { counterReducer };

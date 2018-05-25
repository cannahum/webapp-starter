import { Action } from 'redux';

export enum CounterTypes {
  INCREMENT = 'inc',
  DECREMENT = 'dec',
}

interface ICounterActionType<T> extends Action<CounterTypes> {
  payload?: T;
}

interface ICounterAction extends ICounterActionType<number> {
  type: CounterTypes;
}

export const increment = (): ICounterAction => {
  return {
    type: CounterTypes.INCREMENT,
  };
};

export const decrement = (): ICounterAction => {
  return {
    type: CounterTypes.DECREMENT,
  };
};

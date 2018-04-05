import IAction = WebAppReduxActions.IAction;

export enum CounterTypes {
  INCREMENT = 'inc',
  DECREMENT = 'dec',
}

interface ICounterAction extends IAction<number> {
  type: CounterTypes;
  payload: number;
}

export const increment = (x: number): ICounterAction => {
  return {
    type: CounterTypes.INCREMENT,
    payload: x,
  };
};

export const decrement = (x: number): ICounterAction => {
  return {
    type: CounterTypes.DECREMENT,
    payload: x,
  };
};

export const isCounterActionType = (x: IAction<any>): x is ICounterAction => {
  return Object.values(CounterTypes).includes(x.type);
};

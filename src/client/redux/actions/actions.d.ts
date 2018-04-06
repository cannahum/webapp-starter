declare namespace WebAppReduxActions {
  interface IAction<T> {
    type: string;
    payload?: T;
  }
}

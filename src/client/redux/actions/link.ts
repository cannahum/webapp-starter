import IAction = WebAppReduxActions.IAction;

export enum LinkActionTypes {
  HOVERED = 'hovered',
  UNHOVERED = 'unhovered',
}

export interface ILinkAction extends IAction<undefined> {
  type: LinkActionTypes;
}

export const hover = (): ILinkAction => {
  return {
    type: LinkActionTypes.HOVERED,
  };
};

export const unhover = (): ILinkAction => {
  return {
    type: LinkActionTypes.UNHOVERED,
  };
};

export const isLinkActionType = (action: IAction<any>): action is ILinkAction => {
  return Object.values(LinkActionTypes).includes(action.type);
};

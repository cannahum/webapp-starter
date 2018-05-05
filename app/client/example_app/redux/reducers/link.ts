import { Reducer } from 'redux';
import { LinkActionTypes, hover, unhover, isLinkActionType } from '../actions/link';

export interface ILinkReducer {
  hovered: boolean;
}

const initialState = (): ILinkReducer => {
  return {
    hovered: false,
  };
};

const LinkReducer: Reducer<ILinkReducer> = (state = initialState(), action: any): ILinkReducer => {
  if (isLinkActionType(action)) {
    if (action.type === LinkActionTypes.HOVERED) {
      return {
        ...state,
        hovered: true,
      };
    }
    return {
      ...state,
      hovered: false,
    };
  }
  else {
    return state;
  }
};

export { LinkReducer };

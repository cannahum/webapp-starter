import { Reducer } from 'redux';
import { AuthActionTypes, IAuthAction, AuthField } from '../actions/auth';
import { isNull } from 'util';

export interface IAuthReducer {
  fields: {
    [index: string]: string;
  };
  AuthorizationToken: string | null;
  isAuthenticated: boolean;
}

const initialState = (): IAuthReducer => ({
  fields: {},
  AuthorizationToken: null,
  isAuthenticated: false,
});

export const authReducer: Reducer<IAuthReducer, IAuthAction> =
  (state = initialState(), action: IAuthAction): IAuthReducer => {
    const {type, payload} = action;
    switch (type) {
      case AuthActionTypes.UPDATE_FIELD: {
        if (!isNull(payload)) {
          const {field, value} = payload;
          const newField: any = {};
          newField[field] = value;
          return {
            ...state,
            fields: {
              ...state.fields,
              ...newField,
            },
          };
        }
      }

      default: {
        return state;
      }
    }
  };

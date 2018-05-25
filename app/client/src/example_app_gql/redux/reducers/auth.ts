import { AnyAction, Reducer } from 'redux';
import { AuthActionTypes, IAuthAction, AuthField } from '../actions/auth';
import { isNull } from 'util';

export interface IAuthState {
  fields: {
    [index: string]: string;
  };
  AuthorizationToken: string | null;
  isAuthenticated: boolean;
}

const initialState = (): IAuthState => ({
  fields: {},
  AuthorizationToken: null,
  isAuthenticated: false,
});

export const authReducer: Reducer<IAuthState> =
  (state = initialState(), action: AnyAction): IAuthState => {
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

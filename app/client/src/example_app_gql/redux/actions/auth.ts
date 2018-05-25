import { Action } from 'redux';

// These should be the same identifiers as the GraphQL Endpoint.
export enum AuthField {
  EMAIL,
  PASSWORD,
  PASSWORD_VERIFY,
  USERNAME,
  PROFILE_PICTURE_LINK,
}

export enum AuthActionTypes {
  SIGN_UP = 'signUp',
  LOG_IN = 'logIn',
  UPDATE_FIELD = 'updateField',
  LOG_OUT = 'logOut',
}

interface IAuthActionPayload {
  field: AuthField;
  value: string;
}

interface IAuthActionType<T> extends Action<AuthActionTypes> {
  payload: T;
}

export interface IAuthAction extends IAuthActionType<IAuthActionPayload | null> {
  type: AuthActionTypes;
}

export const updateField = (p: IAuthActionPayload): IAuthAction => {
  const { field, value } = p;
  return {
    type: AuthActionTypes.UPDATE_FIELD,
    payload: {
      field,
      value,
    },
  };
};

export const doSignUp = (): IAuthAction => {
  return {
    type: AuthActionTypes.SIGN_UP,
    payload: null,
  };
};

export const doLogIn = (): IAuthAction => {
  return {
    type: AuthActionTypes.LOG_IN,
    payload: null,
  };
};

export const doLogOut = (): IAuthAction => {
  return {
    type: AuthActionTypes.LOG_OUT,
    payload: null,
  };
};

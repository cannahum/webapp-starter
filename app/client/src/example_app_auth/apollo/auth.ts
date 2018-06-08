import { StoreObject } from 'apollo-cache-inmemory';
import { ClientStateConfig } from 'apollo-link-state';
import getAuthForm from './graphql/getAuthForm';

export interface IAuthState extends StoreObject {
  isLoggedIn: boolean;
  authToken?: string;
}

export enum AuthFormField {
  EMAIL_ADDRESS,
  PASSWORD,
  PASSWORD_CONFIRM,
  USERNAME,
  PROFILE_PICTURE_LINK,
}

export interface IAuthForm extends StoreObject {
  emailAddress: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  profilePictureLink?: string;
}

export interface ILoginSchema {
  emailAddress: string;
  password: string;
}

export interface ISignupSchema extends ILoginSchema {
  username: string;
  passwordConfirm: string;
  profilePictureLink?: string;
}

const authResolvers = {
  Mutation: {
    updateForm: (_: any, { key, value }: any, context: any) => {
      console.log('authResolvers::updateform');
      const { cache } = context;
      if (cache) {
        const previousState = cache.readQuery({ query: getAuthForm });
        const authForm: IAuthForm = previousState.authForm || {};
        authForm[key] = value;
        const data = {
          ...previousState,
          authForm,
        };

        cache.writeData({ data });
      }
    },
  },
  Query: {
    isLoggedIn: () => {
      debugger;
    },
  },
};

const auth: ClientStateConfig = {
  defaults: {
    authForm: {
      __typename: 'AuthForm',
      emailAddress: '',
      password: '',
      passwordConfirmation: '',
      profilePictureLink: '',
      username: '',
    } as IAuthForm,
    auth: {
      isLoggedIn: false,
      authToken: '',
      __typename: 'AuthState',
    } as IAuthState,
  },
  resolvers: authResolvers,
};

export default auth;

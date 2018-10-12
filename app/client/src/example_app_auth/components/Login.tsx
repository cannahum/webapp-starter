import React, { FormEvent } from 'react';
import { MutationFn, graphql, compose, Mutation } from 'react-apollo';
import { History as HHistory } from 'history';
import AbstractAuth, { IAuthProps } from './AbstractAuth';
import updateForm from '../apollo/graphql/updateForm';
import getAuthForm from '../apollo/graphql/getAuthForm';
import getAuthState from '../apollo/graphql/getAuthState';
import { initAuthToken, IAuthForm, IAuthState } from '../apollo/auth';
import { isNullOrUndefined } from 'util';
import gql from 'graphql-tag';

export const LOG_IN = gql`
  mutation login($emailAddress:String!, $password:String!) {
    login(loginInput:{
      emailAddress:$emailAddress,
      password:$password
    })
  }
`;

interface ILoginProps extends IAuthForm, IAuthProps {
  history: HHistory;
}

class Login extends AbstractAuth<ILoginProps> {

  constructor(props: ILoginProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Mutation mutation={LOG_IN}
                update={(cache, { data }) => {
                  const authFormQueryResult: any | null = cache.readQuery({ query: getAuthForm });
                  const authStateQueryResult: any | null = cache.readQuery({ query: getAuthState });
                  const authForm: IAuthForm = authFormQueryResult.authForm;
                  const authState: IAuthState = authStateQueryResult.auth;
                  const { login } = data;
                  if (login) {
                    cache.writeData({
                      data: {
                        ...authFormQueryResult,
                        authForm: {
                          ...authForm,
                          emailAddress: '',
                          username: '',
                          password: '',
                          passwordConfirmation: '',
                          profilePictureLink: '',
                        } as IAuthForm,
                        auth: {
                          ...authState,
                          isLoggedIn: true,
                          authToken: login as string,
                        } as IAuthState,
                      },
                    });
                    // update the link context so every subsequent call gets the header
                    initAuthToken(login);
                    this.props.history.push('/auth/profile');
                    return null;
                  }
                }}>
        {(doLogin: MutationFn, { loading, error, data }) => {
          const renderForm = (): JSX.Element => (
            <div className="auth-wrapper">
              <span className="auth-header">Log in with email and password:</span>
              <form onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => this.onSubmit(e, doLogin)}>
                {this.getEmailInput()}
                {this.getPasswordInput()}
                {this.getSubmitButton('Log In')}
              </form>
            </div>
          );

          return (
            <div>
              {error && <p>Error: {error.message}</p>}
              {renderForm()}
            </div>
          );
        }}
      </Mutation>
    );
  }

  protected isValidInputForm(): boolean {
    const { emailAddress, password } = this.props;
    return emailAddress.indexOf('@') > 0 && password.length >= 8;
  }

  private onSubmit = (e: FormEvent<HTMLFormElement>, mutationFn: MutationFn) => {
    e.preventDefault();
    const { emailAddress, password } = this.props;
    const _: Promise<any> = mutationFn({
      variables: {
        emailAddress,
        password,
      },
    });
  }
}

export default compose(
  graphql(updateForm, {
    name: 'updateForm',
  }),
  graphql(getAuthForm, {
    props: ({ data }) => {
      if (!isNullOrUndefined(data)) {
        const authForm: IAuthForm = (data as any).authForm;
        return {
          ...authForm,
        };
      }
    },
  }),
  graphql(getAuthState, {
    props: ({ data }) => {
      if (!isNullOrUndefined(data)) {
        const authState: IAuthState = (data as any).auth;
        return {
          ...authState,
        };
      }
    },
  }),
)(Login);

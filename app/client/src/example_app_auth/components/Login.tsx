import React, { FormEvent } from 'react';
import { MutationFn, graphql, compose, Mutation } from 'react-apollo';
import AbstractAuth, { IAuthProps } from './AbstractAuth';
import updateForm from '../apollo/graphql/updateForm';
import getAuthForm from '../apollo/graphql/getAuthForm';
import { IAuthForm, IAuthState } from '../apollo/auth';
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
}

class Login extends AbstractAuth<ILoginProps> {

  constructor(props: ILoginProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Mutation mutation={LOG_IN}
                update={(cache, { data }) => {
                  const queryResult: any | null = cache.readQuery({ query: getAuthForm });
                  if (queryResult) {
                    const auth: IAuthState = queryResult.auth;
                    console.log(auth);
                    // Result of the sign up?
                    console.log(data);
                  }
                }}>
        {(doLogin: MutationFn, { loading, error, data }) => {
          console.log(data);

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
)(Login);

import React, { FormEvent } from 'react';
import { compose, graphql, Mutation, MutationFn } from 'react-apollo';
import { isNullOrUndefined } from 'util';
import gql from 'graphql-tag';
import AbstractAuth, { IAuthProps } from './AbstractAuth';
import { LOG_IN } from './Login';
import { IAuthForm } from '../apollo/auth';
import updateForm from '../apollo/graphql/updateForm';
import getAuthForm from '../apollo/graphql/getAuthForm';

const SIGN_UP = gql`
  mutation signup($username:String!, $emailAddress: String!, $password:String!, $profilePictureLink: String) {
    signup(newPersonInput: {
      username: $username,
      emailAddress: $emailAddress,
      password: $password,
      profilePictureLink: $profilePictureLink
    }) {
      emailAddress,
    }
  }
`;

interface ISignupProps extends IAuthForm, IAuthProps {
}

class Signup extends AbstractAuth<ISignupProps> {

  constructor(props: ISignupProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Mutation mutation={SIGN_UP}
                update={(cache, { data }) => {
                  const queryResult: any | null = cache.readQuery({ query: getAuthForm });
                  if (queryResult) {
                    const authForm: IAuthForm = queryResult.authForm;
                    console.log(authForm);
                    // Result of the sign up?
                    const { signup } = data;
                    if (signup) {
                      // Success! Log the user in.
                      const { emailAddress } = signup;
                      const { password } = authForm;
                      cache.writeData({
                        data: {
                          ...queryResult,
                          authForm: {
                            ...queryResult.authForm,
                            emailAddress: '',
                            username: '',
                            password: '',
                            passwordConfirmation: '',
                            profilePictureLink: '',
                          } as IAuthForm,
                        },
                      });
                      return null;
                    }
                  }
                }}>
        {(doSignup: MutationFn, { loading, error, data }) => {
          console.log(data);
          const renderForm = () => (
            <div className="auth-wrapper">
              <span className="auth-header">Sign up with email and password:</span>
              <form onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => this.onSubmit(e, doSignup)}>
                {this.getEmailInput()}
                {this.getUsernameInput()}
                {this.getPasswordInput()}
                {this.getPasswordVerificationInput()}
                {this.getSubmitButton('Sign Up')}
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
    const { emailAddress, password, passwordConfirmation } = this.props;
    return emailAddress.indexOf('@') > 0
      && password.length >= 8
      && password === passwordConfirmation;
  }

  private onSubmit = (e: FormEvent<HTMLFormElement>, mutationFn: MutationFn) => {
    e.preventDefault();
    const { emailAddress, username, password, passwordConfirmation } = this.props;
    const _: Promise<any> = mutationFn({
      variables: {
        emailAddress,
        password,
        passwordConfirmation,
        username,
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
)(Signup);

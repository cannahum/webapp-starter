import React, { FormEvent } from 'react';
import { compose, graphql, MutationFn } from 'react-apollo';
import AbstractAuth, { IAuthProps } from './AbstractAuth';
import { IAuthForm } from "../apollo/auth";
import updateForm from "../apollo/graphql/updateForm";
import getAuthForm from "../apollo/graphql/getAuthForm";
import { isNullOrUndefined } from "util";

interface ISignupProps extends IAuthForm, IAuthProps {
}

class Signup extends AbstractAuth<ISignupProps> {

  constructor(props: ISignupProps) {
    super(props);
  }

  public renderForm(mutationFn: MutationFn) {
    return (
      <div className="auth-wrapper">
        <span className="auth-header">Sign up with email and password:</span>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => mutationFn({
          variables: {
            email: 'cannahum@me.com',
            password: '123123123',
            username: 'cannahum'
          }
        })}>
          {this.getEmailInput()}
          {this.getUsernameInput()}
          {this.getPasswordInput()}
          {this.getPasswordVerificationInput()}
          {this.getSubmitButton('Sign Up')}
        </form>
      </div>
    );
  }

  protected isValidInputForm(): boolean {
    const { emailAddress, password, passwordConfirmation } = this.props;
    return emailAddress.indexOf('@') > 0
      && password.length >= 8
      && password === passwordConfirmation;
  }
}

export default compose(
  graphql(updateForm, {
    name: 'updateForm'
  }),
  graphql(getAuthForm, {
    props: ({ data }) => {
      if (!isNullOrUndefined(data)) {
        const authForm: IAuthForm = (data as any).authForm;
        return {
          ...authForm
        };
      }
    }
  })
)(Signup);

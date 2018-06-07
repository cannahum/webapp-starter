import React, { FormEvent } from 'react';
import { MutationFn, graphql, compose } from 'react-apollo';
import AbstractAuth, { IAuthProps } from './AbstractAuth';
import updateForm from '../apollo/graphql/updateForm';
import getAuthForm from '../apollo/graphql/getAuthForm';
import { IAuthForm } from "../apollo/auth";
import { isNullOrUndefined } from 'util';

interface ILoginProps extends IAuthForm, IAuthProps {
}

class Login extends AbstractAuth<ILoginProps> {

  constructor(props: ILoginProps) {
    super(props);
  }

  public renderForm(mutationFn: MutationFn) {
    return (
      <div className="auth-wrapper">
        <span className="auth-header">Log in with email and password:</span>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => mutationFn()}>
          {this.getEmailInput()}
          {this.getPasswordInput()}
          {this.getSubmitButton('Log In')}
        </form>
      </div>
    );
  }

  protected isValidInputForm(): boolean {
    const { emailAddress, password } = this.props;
    return emailAddress.indexOf('@') > 0 && password.length >= 8;
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
)(Login);

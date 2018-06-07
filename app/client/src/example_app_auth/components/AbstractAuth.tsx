import React, { SyntheticEvent } from 'react';
import Login from "./Login";
import { Mutation, MutationFn } from 'react-apollo';
import gql from "graphql-tag";
import { IAuthForm } from "../apollo/auth";

const LOG_IN = gql`
  mutation login($email:String!, $password:String!) {
    login(loginInput:{
      emailAddress:$email,
      password:$password
    })
  }
`;

const SIGN_UP = gql`
  mutation signup($username:String!, $email: String!, $password:String!, $profilePictureLink: String) {
    signup(newPersonInput: {
      username: $username,
      emailAddress: $email,
      password: $password,
      profilePictureLink: $profilePictureLink
    }) {
      id,
      emailAddress,
      accountType,
    }
  }
`;


export interface IAuthProps {
  updateForm: MutationFn;
}

export default abstract class AbstractAuth<IProps extends IAuthForm & IAuthProps> extends React.Component<IProps> {

  protected constructor(props: IProps) {
    super(props);

    this.updateFormField = this.updateFormField.bind(this);
  }

  public abstract renderForm(mutationFn: MutationFn): JSX.Element | null;

  public render(): JSX.Element {
    return (
      <Mutation mutation={this instanceof Login ? LOG_IN : SIGN_UP}>
        {(loginOrSignup: MutationFn) => (
          <div>
            {this.renderForm(loginOrSignup)}
          </div>
        )}
      </Mutation>
    )
  }

  protected getEmailInput(): JSX.Element {
    const { emailAddress } = this.props;
    return (
      <div className="auth-input-wrapper">
        <label>Email:</label>
        <input type="email"
               autoComplete="email"
               placeholder="example@domain.com"
               value={emailAddress}
               onChange={this.updateFormField('emailAddress')}
               id="email-input"/>
      </div>
    );
  }

  protected getUsernameInput(): JSX.Element {
    const { username } = this.props;
    return (
      <div className="auth-input-wrapper">
        <label>Username:</label>
        <input type="text"
               autoComplete="on"
               minLength={3}
               value={username}
               onChange={this.updateFormField('username')}
               id="username-input"/>
      </div>
    );
  }

  protected getPasswordInput(): JSX.Element {
    const { password } = this.props;
    return (
      <div className="auth-input-wrapper">
        <label>Password:</label>
        <input type="password"
               autoComplete="on"
               id="password-input"
               value={password}
               onChange={this.updateFormField('password')}
               minLength={8}/>
      </div>
    );
  }

  protected getPasswordVerificationInput(): JSX.Element {
    const { passwordConfirmation } = this.props;
    return (
      <div className="auth-input-wrapper">
        <label>Verify Password:</label>
        <input type="password"
               autoComplete="on"
               id="password-verify-input"
               value={passwordConfirmation}
               onChange={this.updateFormField('passwordConfirmation')}
               minLength={8}/>
      </div>
    );
  }

  protected getSubmitButton(message: string): JSX.Element {
    return (
      <div className="auth-submit-button">
        <button disabled={this.isSubmitButtonDisabled()} type="submit">{message}</button>
      </div>
    );
  }

  protected isSubmitButtonDisabled(): boolean {
    return !this.isValidInputForm();
  }

  protected abstract isValidInputForm(): boolean;

  private updateFormField(field: keyof IAuthForm):
    (e: SyntheticEvent<HTMLInputElement>) => void {
    const updateForm: MutationFn = this.props.updateForm;
    return (e: SyntheticEvent<HTMLInputElement>) => {
      e.stopPropagation();
      updateForm({
        variables: {
          field,
          value: (e.nativeEvent.target as any).value,
        }
      });
    };
  }
}

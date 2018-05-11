import React from 'react';
import { doSignUp, doLogIn, updateField, AuthField } from '../redux/actions/auth';
import { IApplicationState } from '../redux';

export interface IDispatchProps {
  doSignUp: typeof doSignUp | typeof doLogIn;
  updateField: typeof updateField;
}

export interface IOwnProps {
  [index: string]: any;
}

export interface IStateProps extends Pick<IApplicationState, 'auth'> {
  [index: string]: any;
}

export type AbstractAuthProps = IDispatchProps & IOwnProps & IStateProps;

export default abstract class AbstractAuth extends React.Component<AbstractAuthProps> {

  constructor(props: AbstractAuthProps) {
    super(props);

    this.onFieldBlur = this.onFieldBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public abstract render(): JSX.Element | null;

  protected getEmailInput(): JSX.Element {
    const {auth: {fields}} = this.props;
    return (
      <div className="auth-input-wrapper">
        <label>Email:</label>
        <input type="email"
               autoComplete="email"
               placeholder="example@domain.com"
               id="email-input"
               value={fields[AuthField.EMAIL] || ''}
               onChange={this.onFieldBlur}/>
      </div>
    );
  }

  protected getUsernameInput(): JSX.Element {
    const {auth: {fields}} = this.props;
    return (
      <div className="auth-input-wrapper">
        <label>Username:</label>
        <input type="text"
               autoComplete="on"
               minLength={3}
               id="username-input"
               value={fields[AuthField.USERNAME] || ''}
               onChange={this.onFieldBlur}/>
      </div>
    );
  }

  protected getPasswordInput(): JSX.Element {
    const {auth: {fields}} = this.props;
    return (
      <div className="auth-input-wrapper">
        <label>Password:</label>
        <input type="password"
               autoComplete="on"
               id="password-input"
               minLength={8}
               value={fields[AuthField.PASSWORD] || ''}
               onChange={this.onFieldBlur}/>
      </div>
    );
  }

  protected getPasswordVerificationInput(): JSX.Element {
    const {auth: {fields}} = this.props;
    return (
      <div className="auth-input-wrapper">
        <label>Verify Password:</label>
        <input type="password"
               autoComplete="on"
               id="password-verify-input"
               minLength={8}
               value={fields[AuthField.PASSWORD_VERIFY] || ''}
               onChange={this.onFieldBlur}/>
      </div>
    );
  }

  protected getSubmitButton(message: string): JSX.Element {
    return (
      <div className="auth-submit-button">
        <input type="submit" value={message}/>
      </div>
    );
  }

  protected abstract submit(): void;

  protected onSubmit(_e: React.SyntheticEvent<any>): void {
    this.submit();
  }

  protected onFieldBlur(e: React.SyntheticEvent<HTMLInputElement>): void {
    const $el: HTMLInputElement = e.currentTarget;
    const {id, value} = $el;
    let field: AuthField = AuthField.EMAIL;

    switch (id) {
      case 'username-input': {
        field = AuthField.USERNAME;
        break;
      }
      case 'password-input': {
        field = AuthField.PASSWORD;
        break;
      }
      case 'password-verify-input': {
        field = AuthField.PASSWORD_VERIFY;
        break;
      }
    }
    this.props.updateField({field, value});
  }
}

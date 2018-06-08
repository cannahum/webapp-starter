import React, { SyntheticEvent } from 'react';
import { MutationFn } from 'react-apollo';
import { IAuthForm } from '../apollo/auth';

export interface IAuthProps {
  updateForm: MutationFn;
}

export default abstract class AbstractAuth<IProps extends IAuthForm & IAuthProps> extends React.Component<IProps> {

  protected constructor(props: IProps) {
    super(props);

    this.updateFormField = this.updateFormField.bind(this);
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
      const _: Promise<any> = updateForm({
        variables: {
          field,
          value: (e.nativeEvent.target as any).value,
        },
      });
    };
  }
}

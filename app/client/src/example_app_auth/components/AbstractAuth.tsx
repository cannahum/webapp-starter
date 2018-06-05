import React from 'react';

export default abstract class AbstractAuth<IProps> extends React.Component<IProps> {

  protected constructor(props: IProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  public abstract render(): JSX.Element | null;

  protected getEmailInput(): JSX.Element {
    return (
      <div className="auth-input-wrapper">
        <label>Email:</label>
        <input type="email"
               autoComplete="email"
               placeholder="example@domain.com"
               id="email-input"/>
      </div>
    );
  }

  protected getUsernameInput(): JSX.Element {
    return (
      <div className="auth-input-wrapper">
        <label>Username:</label>
        <input type="text"
               autoComplete="on"
               minLength={3}
               id="username-input"/>
      </div>
    );
  }

  protected getPasswordInput(): JSX.Element {
    return (
      <div className="auth-input-wrapper">
        <label>Password:</label>
        <input type="password"
               autoComplete="on"
               id="password-input"
               minLength={8}/>
      </div>
    );
  }

  protected getPasswordVerificationInput(): JSX.Element {
    return (
      <div className="auth-input-wrapper">
        <label>Verify Password:</label>
        <input type="password"
               autoComplete="on"
               id="password-verify-input"
               minLength={8}/>
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
}

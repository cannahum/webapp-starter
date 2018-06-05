import React from 'react';
import AbstractAuth from './AbstractAuth';

interface ILoginProps {}

export default class Login extends AbstractAuth<ILoginProps> {

  constructor(props: ILoginProps) {
    super(props);
  }

  protected submit(): any {
    console.log('Login submit!');
  }

  render() {
    return (
      <div className="auth-wrapper">
        <span className="auth-header">Log in with email and password:</span>
        <form onSubmit={this.onSubmit}>
          {this.getEmailInput()}
          {this.getPasswordInput()}
          {this.getSubmitButton('Log In')}
        </form>
      </div>
    );
  }
}

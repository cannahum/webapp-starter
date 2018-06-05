import React from 'react';
import AbstractAuth from './AbstractAuth';

interface ISignupProps {}

export default class Signup extends AbstractAuth<ISignupProps> {

  constructor(props: ISignupProps) {
    super(props);
  }

  protected submit(): any {
    console.log('Signup submit!');
  }

  render() {
    return (
      <div className="auth-wrapper">
        <span className="auth-header">Sign up with email and password:</span>
        <form onSubmit={this.onSubmit}>
          {this.getEmailInput()}
          {this.getUsernameInput()}
          {this.getPasswordInput()}
          {this.getPasswordVerificationInput()}
          {this.getSubmitButton('Sign Up')}
        </form>
      </div>
    );
  }
}

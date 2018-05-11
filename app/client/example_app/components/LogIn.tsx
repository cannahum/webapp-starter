import React from 'react';
import AbstractAuth, { IDispatchProps, IOwnProps, IStateProps } from './AbstractAuth';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { doLogIn, updateField } from '../redux/actions/auth';
import { IApplicationState } from '../redux';

class LogIn extends AbstractAuth {

  public render() {
    return (
      <div className="auth-wrapper">
        <span className="auth-header">Sign up with email and password:</span>
        <form onSubmit={this.onSubmit}>
          {this.getEmailInput()}
          {this.getPasswordInput()}
          {this.getSubmitButton()}
        </form>
      </div>
    );
  }

  protected submit() {
    this.props.doLogin();
  }
}

// Redux connections
const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (dispatch: Dispatch): IDispatchProps => ({
  doSignUp: bindActionCreators(doLogIn, dispatch),
  updateField: bindActionCreators(updateField, dispatch),
});
const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IApplicationState> =
  (state: IApplicationState): IStateProps => {
    return {
      auth: state.auth,
    };
  };
export default connect<IStateProps, IDispatchProps, {}, IApplicationState>(mapStateToProps, mapDispatchToProps)(LogIn);

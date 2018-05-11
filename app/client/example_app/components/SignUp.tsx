import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { doSignUp, updateField, AuthField, IAuthAction } from '../redux/actions/auth';
import { IApplicationState } from '../redux/index';

interface IDispatchProps {
  doSignUp: typeof doSignUp;
  updateField: typeof updateField;
}

interface IOwnProps {
  [index: string]: any;
}

interface IStateProps extends Pick<IApplicationState, 'auth'> {
  [index: string]: any;
}

type SignUpProps = IDispatchProps & IOwnProps & IStateProps;

// Redux connections
const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (dispatch: Dispatch): IDispatchProps => ({
  doSignUp: bindActionCreators(doSignUp, dispatch),
  updateField: bindActionCreators(updateField, dispatch),
});
const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IApplicationState> =
  (state: IApplicationState): IStateProps => {
    return {
      auth: state.auth,
    };
  };

class SignUp extends React.Component<SignUpProps, {}> {

  constructor(props: SignUpProps) {
    super(props);
  }

  public render() {
    const {auth: {fields}} = this.props;
    return (
      <div className="auth-wrapper">
        <span className="auth-header">Sign up with email and password:</span>
        <form onSubmit={this.onSubmit}>
          <div className="auth-input-wrapper">
            <label>Email:</label>
            <input type="email"
                   autoComplete="email"
                   placeholder="example@domain.com"
                   id="email-input"
                   value={fields[AuthField.EMAIL] || ''}
                   onChange={this.onFieldBlur}/>
          </div>
          <div className="auth-input-wrapper">
            <label>Username:</label>
            <input type="text"
                   autoComplete="on"
                   minLength={3}
                   id="username-input"
                   value={fields[AuthField.USERNAME] || ''}
                   onChange={this.onFieldBlur}/>
          </div>
          <div className="auth-input-wrapper">
            <label>Password:</label>
            <input type="password"
                   autoComplete="on"
                   id="password-input"
                   minLength={8}
                   value={fields[AuthField.PASSWORD] || ''}
                   onChange={this.onFieldBlur}/>
          </div>
          <div className="auth-input-wrapper">
            <label>Verify Password:</label>
            <input type="password"
                   autoComplete="on"
                   id="password-verify-input"
                   minLength={8}
                   value={fields[AuthField.PASSWORD_VERIFY] || ''}
                   onChange={this.onFieldBlur}/>
          </div>
          <div className="auth-submit-button">
            <span>Sign Up!</span>
          </div>
        </form>
      </div>
    );
  }

  private onFieldBlur = (e: React.SyntheticEvent<HTMLInputElement>): void => {
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

  private onSubmit = (e: React.SyntheticEvent<any>): void => {
    this.props.doSignUp();
  }
}

export default connect<IStateProps, IDispatchProps, {}, IApplicationState>(mapStateToProps, mapDispatchToProps)(SignUp);

// import React from 'react';
// import AbstractAuth, { IStateProps, IOwnProps, IDispatchProps } from './AbstractAuth';
// import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
// import { Dispatch, bindActionCreators } from 'redux';
// import { doSignUp, updateField, AuthField } from '../redux/actions/auth';
// import { IApplicationState } from '../redux';
//
// class SignUp extends AbstractAuth {
//
//   public render() {
//     return (
//       <div className="auth-wrapper">
//         <span className="auth-header">Sign up with email and password:</span>
//         <form onSubmit={this.onSubmit}>
//           {this.getEmailInput()}
//           {this.getUsernameInput()}
//           {this.getPasswordInput()}
//           {this.getPasswordVerificationInput()}
//           {this.getSubmitButton('Sign Up')}
//         </form>
//       </div>
//     );
//   }
//
//   protected submit(): void {
//     this.props.doSignUp();
//   }
// }
//
// // Redux connections
// const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (dispatch: Dispatch): IDispatchProps => ({
//   doSignUp: bindActionCreators(doSignUp, dispatch),
//   updateField: bindActionCreators(updateField, dispatch),
// });
// const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IApplicationState> =
//   (state: IApplicationState): IStateProps => {
//     return {
//       auth: state.auth,
//     };
//   };
// export default connect<IStateProps, IDispatchProps, {}, IApplicationState>(mapStateToProps, mapDispatchToProps)(SignUp);

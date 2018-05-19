// import React from 'react';
// import { withRouter, RouteComponentProps, Route } from 'react-router';
// import SignUp from './SignUp';
// import LogIn from './LogIn';
//
// interface IHomeProps {
// }
//
// type HomeProps = RouteComponentProps<any> & IHomeProps;
//
// class Home extends React.Component<HomeProps> {
//
//   public render() {
//     const {history} = this.props;
//     const navigateTo = (route: string): void => {
//       history.push(route);
//     };
//     return (
//       <div id="example-app-wrapper">
//         <div id="example-app-header">
//           <h1>Welcome To The Full Stack App Starter!</h1>
//         </div>
//         <div id="example-app-content">
//           <p>
//             In this example, you will be able to see the full flow that already exists as an example app
//           </p>
//           <p>
//             Create a user, or login with an existing user. If you've configured the DB connection correctly,
//             this should work. Then create posts.
//           </p>
//           <div className="navigate-to-auth" onClick={(e: React.SyntheticEvent<HTMLDivElement>) => navigateTo('signup')}>
//             Go To Sign Up
//           </div>
//           <div className="navigate-to-auth" onClick={(e: React.SyntheticEvent<HTMLDivElement>) => navigateTo('login')}>
//             Go To Log In
//           </div>
//
//           <div>
//             <Route path="/signup" component={SignUp}/>
//             <Route path="/login" component={LogIn}/>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
//
// export default withRouter(Home);

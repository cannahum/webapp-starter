import React from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import logout from '../apollo/graphql/logout';


class Logout extends React.Component {

  render() {
    return (
      <Mutation mutation={logout}>
        {(logout, { data, error, loading }) => {
          setTimeout(() => {
            logout();
            this.props.history.push('/auth');
          }, 0);
          return null;
        }}
      </Mutation>
    )
  }
}

export default compose(
  graphql(logout, {
    name: 'logout'
  })
)(Logout);

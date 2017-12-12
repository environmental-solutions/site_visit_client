import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {Button} from 'react-bootstrap';

const LogOutMutation = gql`
  mutation SignOut($signOutInput: signOutInput!) {
    signOut(input: $signOutInput) {
      email
      token
    }
  }
`;

class LogOut extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(e) {
    e.preventDefault();
    console.log('logging out');

    this.props
      .mutate({
        variables: {signOutInput: {}},
      })
      .then(({data}) => {
        console.log('logout reply', data);
        localStorage.setItem('token', data.signOut.token);
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    return (
      <Button bsStyle="primary" onClick={this.handleLogOut}>
        Logout
      </Button>
    );
  }
}

LogOut = graphql(LogOutMutation)(LogOut);
export default LogOut;

import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col, Button} from "react-bootstrap"

const LoginQuery = gql`
  query ProjectsQuery {
    projects {
      name
      id
    }
  }`;

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    // // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    // if (username && password) {
    //     dispatch(userActions.login(username, password));
    // }
  }

 render() {
    let { data } = this.props;
    if (data.isLoading) {
      return <div>Loading...</div>
    }
    console.log("got data");
    console.log(JSON.stringify(data));
    return (
       <div className="Login">
        <Grid>
          <Row>
            <Col xs={12}>
              <h2>Login</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="email">
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="password">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </FormGroup>
                <Button
                  bsStyle="primary"
                  // disabled={!this.validateForm()}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

LoginPage = graphql(LoginQuery)(LoginPage)
export default LoginPage


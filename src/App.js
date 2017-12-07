import './App.css';
import React, { Component } from 'react';
import ApolloClient from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { Navbar, Nav, NavItem} from "react-bootstrap"

import ProjectView from './views/ProjectView'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

//NOTE: using build environment to determine where to direct
//external api calls
//NOTE: this requires devs to map a ddx local domain
var api = ''
if (window.location.hostname.includes('ddx')) {
  api = 'http://dev.ddx:8000/graphql'
} else if (window.location.hostname.includes('dev')) {
  api = 'http://site_visit.dev:8000/graphql'
} else if (window.location.hostname.includes('localhost')) {
  api = 'http://localhost:3000/graphql'
} else {
  api ='http://site-visit-api.workers.cloud/graphql'
}

console.log(`callling sever: ${api} `)
console.log (`creating apollo client with public url process.env ${JSON.stringify(process.env)}`);
console.log (`REACT_APP_SERVER_API ${JSON.stringify(process.env.REACT_APP_SERVER_API)}`);

const client = new ApolloClient({
  link: new HttpLink({
    uri: api,
    opts: {
      credentials: 'same-origin',
      mode: 'no-cors',
    }
  }),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">Site Visit</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav bsStyle="pills">
                  <NavItem eventKey={1} href="/">Projects</NavItem>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={2} href="/login">Login</NavItem>
                  <NavItem eventKey={3} href="/login">Logout</NavItem>
                  <NavItem eventKey={4} href="/register">Register</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <h1>Site Visit</h1>
            <Route exact path="/" component={ProjectView} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;

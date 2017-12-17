import './App.css';
import React, {Component} from 'react';
import ApolloClient from 'apollo-client-preset';
import {ApolloProvider} from 'react-apollo';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BrowserRouter, Route} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import ProjectView from './views/ProjectView';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import localStateLink from './stores/localStateLink';

//NOTE: using build environment to determine where to direct
//external api calls
var api = '';
if (window.location.hostname.includes('ddx')) {
  api = 'http://site-visit.ddx:8000/graphql';
} else if (window.location.hostname.includes('dev')) {
  api = 'http://site_visit.dev:8000/graphql';
} else if (window.location.hostname.includes('localhost')) {
  api = 'http://localhost:3000/graphql';
} else {
  api = 'http://site-visit-api.workers.cloud/graphql';
}

console.log(`callling sever: ${api} `);
console.log(
  `creating apollo client with public url process.env ${JSON.stringify(
    process.env,
  )}`,
);
console.log(
  `REACT_APP_SERVER_API ${JSON.stringify(process.env.REACT_APP_SERVER_API)}`,
);

const httpLink = new HttpLink({
  uri: api,
  opts: {
    credentials: 'same-origin',
    mode: 'no-cors',
  },
});

const logoutLink = onError(({networkError}) => {
  if (networkError.statusCode === 401) {
    console.log('network error');
    // logout();
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `bearer ${localStorage.getItem('token') || null}`,
    },
  });
  return forward(operation);
});

const dataLink = concat(localStateLink, httpLink)

const client = new ApolloClient({
  // link: concat(authMiddleware, httpLink, localStateLink),
  // link: concat(authMiddleware, localStateLink, httpLink),
  link: concat(authMiddleware, dataLink),
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
              <Nav bsStyle="pills">
                <NavItem eventKey={1} href="/">
                  Projects
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={2} href="/login">
                  Login
                </NavItem>
                <NavItem eventKey={3} href="/login">
                  Logout
                </NavItem>
                <NavItem eventKey={4} href="/register">
                  Register
                </NavItem>
              </Nav>
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

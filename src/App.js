import './App.css';
import React, { Component } from 'react';
import ApolloClient from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Route } from 'react-router-dom'

import ProjectView from './views/ProjectView'

var serverUrl;
if (process.env.REACT_APP_SERVER_API) {
  serverUrl = `${process.env.REACT_APP_SERVER_API}`
} else {
  serverUrl = 'http://localhost:3000/graphql'
}

console.log (`creating appolo client with public url process.env ${JSON.stringify(process.env)}`);
console.log (`REACT_APP_SERVER_API ${JSON.stringify(process.env.REACT_APP_SERVER_API)}`);
console.log (`computed server url ${serverUrl}`);
const client = new ApolloClient({
  link: new HttpLink({
    uri: serverUrl,
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
            <h1>Site Visit</h1>
            <Route exact path="/" component={ProjectView} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;

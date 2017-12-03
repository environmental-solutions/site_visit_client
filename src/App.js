import './App.css';
import React, { Component } from 'react';
import ApolloClient from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Route } from 'react-router-dom'

import ProjectView from './views/ProjectView'

//NOTE: using build environment to determine where to direct
//external api calls
//NOTE: this requires devs to map a ddx local domain
var api = ''
if (window.location.hostname.includes('ddx')) {
  api = 'http://dev.ddx:8000/graphql'
} else if (window.location.hostname.includes('dev')) {
  api = 'http://site_visit.dev:3000/graphql'
} else if (window.location.hostname.includes('localhost')) {
  // api ='http://forecastingapi.workers.cloud/'
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
            <h1>Site Visit</h1>
            <Route exact path="/" component={ProjectView} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;

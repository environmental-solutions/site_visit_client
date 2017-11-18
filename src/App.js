import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink({
    uri: 'http://foo.bar:3000/graphql?',
    opts: {
      credentials: 'same-origin',
      mode: 'no-cors',
    }
  }),
  cache: new InMemoryCache(),
});

// client.query({ query: gql`query { projects { name id } }` }).then(console.log);

// here we create a query opearation
const MY_QUERY = gql`
  query projects {
    name
    id

  }`;

// We then can use the graphql container to pass the query results returned by MY_QUERY
// to a component as a prop (and update them as the results change)
const MyComponentWithData = graphql(MY_QUERY)(props => <div>...</div>);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1>This is Apollo</h1>
          <MyComponentWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

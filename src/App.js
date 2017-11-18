import './App.css';
import React, { Component } from 'react';
import ApolloClient from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
    opts: {
      credentials: 'same-origin',
      mode: 'no-cors',
    }
  }),
  cache: new InMemoryCache(),
});

const ProjectQuery = gql`
  query ProjectsQuery {
    projects {
      name
      id
    }
  }`;

const ProjectsList = graphql(ProjectQuery)(props => <div><ul>{JSON.stringify(props.data.projects)}</ul></div>);

class App extends Component {

  render() {
    console.log("getting data");
    console.log(client.data);
    console.log("done getting data");
    return (
      <ApolloProvider client={client}>
        <div>
          <h1>This is Apollo</h1>
          <ProjectsList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

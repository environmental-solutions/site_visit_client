import {withClientState} from 'apollo-link-state';
import gql from 'graphql-tag';

var foo = 'foobar';
var bar = 'the other';

export default withClientState({
  Query: {
    otherLocalStateInfo: () => bar,
    localStateInfo: () => foo,
    hashLocalStateInfo: () => {
      var h = {};
      h['foo'] = foo;
      h['bar'] = bar;
      return h;
    },
  },
  Mutation: {
    setLocalStateInfo: (_, { text }, { cache }) => {
      console.log (`setting state from:${foo} to: ${text}`);
      foo = text;
      // const query = gql`
      //   query localStateInfo {
      //     localStateInfo @client
      //   }
      // `;
      // const data = {
      //   localStateInfo: foo,
      // };
      // // cache.writeQuery({ query, data });
      // return data;
    },
    toggleLoggedIn: (_, variables, {cache}) => {
      return false;
    },
  },
});

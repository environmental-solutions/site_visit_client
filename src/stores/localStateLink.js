import {withClientState} from 'apollo-link-state';

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
      console.log (`setting state! to ${text}`);
      this.foo = text;
      const data = {
        localStateInfo: this.foo,
      };
      // cache.writeQuery({ query, data });
      return data;
    },
    toggleLoggedIn: (_, variables, {cache}) => {
      // const id = `TodoItem:${variables.id}`;
      // const fragment = gql`
      //   fragment completeTodo on TodoItem {
      //     completed
      //   }
      // `;
      // const data = cache.readFragment({ fragment, id });
      // data.completed = !data.completed;
      // cache.writeFragment({ fragment, id, data });
      // return data;
      return false;
    },
  },
});

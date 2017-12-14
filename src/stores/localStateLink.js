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

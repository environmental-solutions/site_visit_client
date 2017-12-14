import {withClientState} from 'apollo-link-state';

export default withClientState({
  Query: {
    localStateInfo: () => "foobar",
    // localStateInfo: () => {
    //   data: {
    //     isLoggedIn: 'foobar';
    //   }
    // },
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

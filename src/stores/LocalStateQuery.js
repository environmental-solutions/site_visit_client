import {graphql} from 'react-apollo';
import gql from "graphql-tag";

export const LocalStateQuery = gql`
  query localStateQuery {
    localStateInfo @client
  }
`;

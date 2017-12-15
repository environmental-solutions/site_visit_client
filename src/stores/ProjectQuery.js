import {graphql} from 'react-apollo';
import gql from "graphql-tag";

export const ProjectQuery = gql`
  query ProjectQuery {
    projects {
      name
      id
    }
  }
`;


import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CreateProject from '../components/createProject';

const ProjectQuery = gql`
  query ProjectsQuery {
    projects {
      name
      id
    }
  }`;

class ProjectView extends React.Component {

  render() {
    let { data } = this.props;
    if (data.isLoading) {
      return <div>Loading...</div>
    }
    console.log("got data");
    console.log(JSON.stringify(data));
    if (data.projects) {
      return (
        <div>
          <h2>Projects</h2>
          <ul>
            {data.projects.map ((project, index) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
          <CreateProject />
        </div>
      )
  } else {
    return (
      <div>
        <h2>Projects</h2>
        Loading...
      </div>
      )
    }
  }

}

ProjectView = graphql(ProjectQuery)(ProjectView)
export default ProjectView

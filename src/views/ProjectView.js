import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap"
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
        <Grid>
          <Row>
            <Col xs={12}>
              <h2>Projects</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <h3>Add a New Project</h3>
              <CreateProject />
            </Col>
            <Col xs={6}>
              <h3>Project List</h3>
              <ListGroup>
                {data.projects.map ((project, index) => (
                  <ListGroupItem key={project.id}>{project.name}</ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      )
  } else {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h2>Projects</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h3>Loading...</h3>
          </Col>
          <Col xs={6}>
          </Col>
        </Row>
      </Grid>
      )
    }
  }

}

ProjectView = graphql(ProjectQuery)(ProjectView)
export default ProjectView

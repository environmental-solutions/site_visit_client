import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {Grid, Row, Col} from 'react-bootstrap';
import { LocalStateQuery } from '../stores/LocalStateQuery';

class LocalReadFoo extends React.Component {
  render() {
    let {data} = this.props;
    console.log('got local foo read data');
    console.log(JSON.stringify(data));
    if (data.localStateInfo) {
      return (
        <Grid>
          <Row>
            <h3>Local State</h3>
            <Col xs={12}>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <h4>LocalStateInfo: {data.localStateInfo}</h4>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <h2>Local State</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <h3>Loading...</h3>
            </Col>
            <Col xs={6} />
          </Row>
        </Grid>
      );
    }
  }
}

LocalReadFoo = graphql(LocalStateQuery)(LocalReadFoo);
export default LocalReadFoo;

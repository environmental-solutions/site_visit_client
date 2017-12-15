import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';

const mutation = gql`
  mutation setLocalState($text: String!) {
    setLocalStateInfo(text: $text) @client {
      localStateInfo @client
    }
  }
`;

class LocalWriteFoo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log (`future foo? ${this.state.value}`);
  }

  handleSubmit(event) {
    console.log(`writing foo? of ${this.state.value}`);
    this.props
      .mutate({
        variables: {
          text: `${this.state.value}`,
        },
      })
      .then(({data}) => {
        console.log('got data', data);
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    return (
      <div>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Set Foo</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button
          bsStyle="primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Set Foo
        </Button>
      </div>
    );
  }

};
LocalWriteFoo = graphql(mutation)(LocalWriteFoo);

export default LocalWriteFoo;

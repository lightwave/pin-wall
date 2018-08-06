import React from 'react';
import { connect } from 'react-redux';

import { Card, CardImg, CardTitle, CardText } from 'reactstrap';

import AddLinkForm from '../components/add-link-form';
import config from '../config.js';
import actions from '../actions';

class AddLinkCard extends React.Component {

  handleAddLink = (sourceUrl) => {
    const { csrfToken } = this.props.session;
    this.props.addLink(sourceUrl, csrfToken);
  }

  render() {
    const { session } = this.props;

    if (!session.user) {
      return null;
    }

    return (
      <Card style={this.props.style}>
        <AddLinkForm
          style={{ margin: 16 }}
          onAdd={this.handleAddLink}
        />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  addLink: actions.addLink,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkCard);

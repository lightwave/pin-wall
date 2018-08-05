import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Page from '../components/page';
import ImageCard from '../components/image-card';
import Layout from '../components/layout';
import actions from '../actions';

class UserWall extends Page {
  componentDidMount() {
    const { router: { query: { userId } } } = this.props;
    console.log('rounter query userId', userId);
    if (userId) {
      this.props.getUserPins(userId);
    }
  }

  handleDeleteUserPin = async (pinId, e) => {
    return {};
  }

  handleSaveUserPin = async (sourceUrl, e) => {
    return {};
  }

  render() {
    const { router, session, currentPins } = this.props;

    return (
      <Layout title="Image Wall" session={session}>
        {currentPins && currentPins.map(pin => (
          (pin.user === session.user.id)
            ? <ImageCard
                key={pin._id}
                pinId={pin._id}
                signedIn={!!session.user}
                onDelete={this.handleDeleteUserPin}
                {...pin}
              />
            : <ImageCard
                key={pin._id}
                signedIn={!!session.user}
                onSave={this.handleSaveUserPin}
                {...pin}
              />
        ))}
      </Layout>
    );
  }
}

function mapStateToProps({ currentPins }) {
  return { currentPins };
}

const mapDispatchToProps = {
  getUserPins: actions.getUserPins,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserWall));

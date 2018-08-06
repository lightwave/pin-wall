import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import InfiniteScroll from 'react-infinite-scroller';

import Page from '../components/page';
import ImageCard from '../components/image-card';
import Layout from '../components/layout';
import actions from '../actions';
import AddLinkCard from '../containers/add-link-card';

const PAGE_SIZE = 5;

class UserWall extends Page {
  componentDidMount() {
    const { router: { query: { userId } } } = this.props;
    if (userId) {
      this.props.getUserPins(userId, PAGE_SIZE);
    }
  }

  handleDeleteUserPin = async (pinId) => {
    this.props.deleteUserPin(pinId, this.props.session.csrfToken);
  }

  handleSaveUserPin = async (sourceUrl) => {
    this.props.saveUserPin(sourceUrl, this.props.session.csrfToken);
  }

  loadMorePins = (page) => {
    const { router: { query: { userId } } } = this.props;
    if (userId && this.props.hasMorePins) {
      this.props.getUserPins(userId, PAGE_SIZE, this.props.nextCursor);
    }
  }

  render() {
    const { router, session, currentPins } = this.props;

    return (
      <Layout title="Image Wall" session={session}>
        <AddLinkCard session={session} />
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMorePins}
          hasMore={this.props.hasMorePins}
          loader={<div>Loading...</div>}
        >
          {currentPins && currentPins.map(pin => (
            (session && session.user && pin.user === session.user.id)
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
        </InfiniteScroll>
      </Layout>
    );
  }
}

function mapStateToProps({ currentPins, hasMorePins, nextCursor }) {
  return { currentPins, hasMorePins, nextCursor };
}

const mapDispatchToProps = {
  getUserPins: actions.getUserPins,
  saveUserPin: actions.saveUserPin,
  deleteUserPin: actions.deleteUserPin,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserWall));

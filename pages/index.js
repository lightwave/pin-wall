import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import { Container } from 'reactstrap';
import { Card, CardImg, CardTitle, CardText } from 'reactstrap';

import Page from '../components/page';
import Layout from '../components/layout';
import actions from '../actions';
import AddLinkCard from '../containers/add-link-card';

class Home extends Page {
  componentDidMount() {
    this.props.getUserWallInfos();
  }

  render() {
    const { session, userWallInfos } = this.props;
    const signedIn = !!session.user;

    return (
      <Layout {...this.props} container={false}>
        <Container>
          {signedIn &&
            <AddLinkCard
              style={{ marginTop: 16, marginBottom: 16 }}
              session={session}
            />
          }
          <hr />
          <h1>User's walls</h1>
          {userWallInfos && userWallInfos.map(info => <WallCover key={info._id} {...info} />)}
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = ({ userWallInfos }) => ({
  userWallInfos,
});

export default connect(
  mapStateToProps,
  {
    getUserWallInfos: actions.getUserWallInfos,
  }
)(Home);

const WallCover = ({ _id, name, coverImageUrl, count }) => (
  <Card style={{width: 250, marginTop: 8, marginRight: 8 }}>
    <Link as={`/user/${_id}/wall`} href={`/user-wall?userId=${_id}`}>
      <CardImg top src={coverImageUrl} />
    </Link>
    <CardTitle style={{ paddingLeft: 8 }}>{name}</CardTitle>
    <CardText
      style={{
        textAlign: 'right',
        paddingRight: 8,
        paddingBottom: 5,
      }}
    >
      {count} Pins
    </CardText>
  </Card>
);

import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import { Container } from 'reactstrap';
import { Card, CardImg, CardTitle, CardText } from 'reactstrap';

import Page from '../components/page';
import Layout from '../components/layout';
import actions from '../actions';

class Home extends Page {
  componentDidMount() {
    this.props.getUserWallInfos();
  }

  render() {
    const { session: { user }, userWallInfos } = this.props;

    if (!userWallInfos) return null;

    return (
      <Layout {...this.props} container={false}>
        <Container>
          {userWallInfos.map(info => <WallCover key={info._id} {...info} />)}
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

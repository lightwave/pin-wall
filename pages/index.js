import React from 'react';
import { Container } from 'reactstrap';
import Page from '../components/page';
import Layout from '../components/layout';

export default class extends Page {
  render() {
    return (
      <Layout {...this.props} navmenu={false} container={false}>
        <Container>
          Inside Container
        </Container>
      </Layout>
    );
  }
}

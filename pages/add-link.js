import React from 'react';

import { NextAuth } from 'next-auth/client';
import fetch from 'isomorphic-unfetch';

import Page from '../components/page';
import Layout from '../components/layout';

import AddLinkForm from '../components/add-link-form';
import config from '../config.js';
import AddLinkCard from '../containers/add-link-card';

class AddLink extends Page {

  render() {
    const { session } = this.props;

    if (!session.user) {
      return this.mustBeLoggedIn(); 
    }

    return (
      <Layout session={this.props.session}>
        <AddLinkCard session={session}/>
      </Layout>
    );
  }
}

export default AddLink;

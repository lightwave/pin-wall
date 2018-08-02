import React from 'react';
import Router from 'next/router';
import { Row, Col, Form, Input, Label, Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { NextAuth } from 'next-auth/client';

export default class extends React.Component {
  render() {
    if (this.props.session.user) {
      return(<div/>);
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col xs={12} md={6}>
              <SignInButtons providers={this.props.providers}/>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}

export class SignInButtons extends React.Component {
  render() {
    const { providers } = this.props;
    return (
      <React.Fragment>
        {
          Object.keys(providers).map((provider, i) => {
            if (!providers[provider].signin) return null;

            return (
              <p key={i}>
                <a
                  className="btn btn-block btn-outline-secondary"
                  href={providers[provider].signin}
                >
                  Sign in with {provider}
                </a>
              </p>
            );
          })
        }
      </React.Fragment>
    );
  }
}

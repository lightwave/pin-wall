import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import btoa from 'btoa';
import config from '../config';

class TinyUrlModal extends React.Component {
  constructor(props) {
    super(props);

    this.url = React.createRef();

    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  copyToClipboard = () => {
    console.log(this.url.current.value);
    const domUrl = this.url.current;
    domUrl.select();
    document.execCommand('copy');
  }

  render() {
    const { pinId } = this.props;
    const hash = btoa(pinId);
    const tinyUrl = `${config.api_server}/img/${hash}`;

    return (
      <div style={this.props.style}>
        <Button size="sm" onClick={this.toggle}>
          Tiny URL
        </Button>
        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <a style={{ fontSize: "0.8em" }} href={tinyUrl}>{tinyUrl}</a>
            <textarea
              ref={this.url}
              row="1"
              cols="80"
              readOnly
              style={{ border: 0, position: 'absolute', left: '-9999px' }}
              value={tinyUrl}
            />
            <Button
              style={{ marginLeft: 16 }}
              size="sm"
              onClick={this.copyToClipboard}
            >
              Copy
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TinyUrlModal;

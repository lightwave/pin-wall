import React from 'react';
import { Button, Card, CardImg } from 'reactstrap';

const ImageCard = ({ pinId, signedIn, sourceUrl, onSave, onDelete }) => (
  <Card style={{width: 250, marginTop: 8, marginRight: 8 }}>
    <CardImg top src={sourceUrl} />
    { signedIn && onSave &&
      <Button
        size="sm"
        style={{ width: 55, margin: 8 }}
        onClick={e => onSave(sourceUrl, e)}
      >
        Save
      </Button>
    }
    { signedIn && onDelete &&
      <Button
        size="sm"
        color="danger"
        style={{
          width: 34,
          margin: 8,
          paddingLeft: 8,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        onClick={e => onDelete(pinId, e)}
      >
        <span
          className="icon ion-ios-trash mr-1"
          style={{ fontSize: '2em' }}
        />
      </Button>
    }
  </Card>
);

export default ImageCard;


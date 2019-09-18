import React from 'react';
import { Card } from 'react-bootstrap';

import './UploadImage.css';

/**
 * UploadImage component
 */
function UploadImage() {
  return (
    <Card border="dark" className="upload-img-card">
      <Card.Body className="upload-img-card-body">
        <Card.Title>Add a new image</Card.Title>
        <input type="file" />
      </Card.Body>
    </Card>
  );
}

export default UploadImage;
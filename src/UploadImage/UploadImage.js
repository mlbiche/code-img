import React from 'react';

import './UploadImage.css';

import { Card } from 'react-bootstrap';
/**
 * UploadImage component
 */
function UploadImage() {
  return (
    <Card border="dark" className="upload-image-container">
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>ِAdd a new disscussion image</Card.Title>
        <input type="file" />
      </Card.Body>
    </Card>
  );
}

export default UploadImage;
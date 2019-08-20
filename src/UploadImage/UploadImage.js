import React from 'react';

import './UploadImage.css';

/**
 * UploadImage component
 */
function UploadImage() {
  return (
    <div className="upload-image-container">
      <p>Add a new image</p>
      <input type="file" />
    </div>
  );
}

export default UploadImage;
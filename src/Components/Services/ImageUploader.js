import React, { useState, useRef } from 'react';
import './ImageUploader.css';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null); // Ref to access the file input element

  // Handle file input
  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle drag events
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Trigger file input on button click
  const handleChooseImageClick = () => {
    fileInputRef.current.click(); // Simulate a click on the hidden file input
  };

  return (
    <div className="uploader-container">
      <div
        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <img src={image} alt="Uploaded Preview" className="preview-image" />
        ) : (
          <p>Drag & Drop</p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        ref={fileInputRef} // Assign the ref to the input element
        className="file-input"
        style={{ display: 'none' }} // Hide the input element
      />
      <button className="upload-button" onClick={handleChooseImageClick}>
        Choose Image
      </button>
    </div>
  );
};

export default ImageUploader;

import React, { useState, useRef } from 'react';
import './ImageUploader.css';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const MAX_IMAGES = 5; // Maximum number of images allowed

  const isImageFile = (file) => file && file.type.startsWith('image/');

  // Handle file input
  const handleFileInput = (event) => {
    const files = Array.from(event.target.files);
    const validImages = files.filter(isImageFile).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    if (images.length + validImages.length > MAX_IMAGES) {
      alert(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    setImages((prev) => [...prev, ...validImages]);
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
    const files = Array.from(event.dataTransfer.files);
    const validImages = files.filter(isImageFile).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    if (images.length + validImages.length > MAX_IMAGES) {
      alert(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    setImages((prev) => [...prev, ...validImages]);
  };

  // Trigger file input on button click
  const handleChooseImageClick = () => {
    if (images.length >= MAX_IMAGES) {
      alert(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }
    fileInputRef.current.click();
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle keydown for deletion
  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      handleDeleteImage(index);
    }
  };

  // Handle context menu for deletion
  const handleContextMenu = (event, index) => {
    event.preventDefault();
    if (window.confirm('Do you want to delete this image?')) {
      handleDeleteImage(index);
    }
  };

  return (
    <div className="uploader-container">
      <p>Please take a picture or put a picture in it</p>

      <p> Can enter up to 5 photos</p>
      <div
        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {images.length === 0 ? <p>Drag & Drop</p> : <p>Drop more images</p>}
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        ref={fileInputRef}
        className="file-input"
        style={{ display: 'none' }}
      />
      <button className="upload-button" onClick={handleChooseImageClick}>
        Choose Images
      </button>
      <div className="image-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-item"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onContextMenu={(e) => handleContextMenu(e, index)}
          >
            <img src={image.url} alt={`Uploaded Preview ${index}`} className="preview-image" />
            <p className="file-name">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;

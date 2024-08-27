import React, { useState } from 'react';
import axios from 'axios';

function BackgroundRemoval() {
  const [image, setImage] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRemoveBackground = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/remove-background', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Important for handling file downloads
      });

      const url = URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error('Error removing background:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleRemoveBackground}>Remove Background</button>
      {downloadLink && (
        <div>
          <a href={downloadLink} download="processed-image.png">Download Image</a>
        </div>
      )}
    </div>
  );
}

export default BackgroundRemoval;

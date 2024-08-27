import React, { useState } from 'react';
import './PageSpeed.css'; // Import custom CSS

function PageSpeed() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    const urls = url.split('\n').map(domain => domain.trim()).filter(Boolean);
    const generatedLinks = urls.map((domain, index) => {
      return {
        number: index + 1,
        url: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(domain)}`,
      };
    });
    setLinks(generatedLinks);
  };

  const handleClear = () => {
    setUrl('');
    setLinks([]);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="form-group">
          <h1 htmlFor="urlInput">Submit Your Website URLs (Multiple URL)</h1>
          <textarea
            className="form-control"
            id="urlInput"
            value={url}
            onChange={handleInputChange}
            placeholder="example.com"
            rows="7"
          />
        </div>
        <div className="button-group">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
        </div>
        <div className="generated-links">
          {links.length > 0 && (
            <ul>
              {links.map((link, index) => (
                <li key={index} className="link-item">
                  <strong>{link.number}.</strong>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default PageSpeed;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderBottom from './HeaderBottom';

function Testapp() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    const urls = url.split('\n').map(domain => domain.trim()).filter(Boolean);
    const generatedLinks = urls.map((domain, index) => {
      return {
        number: index + 1, // Add a serial number starting from 1
        url: `https://ahrefs.com/traffic-checker/?input=${encodeURIComponent(domain)}&mode=subdomains`,
      };
    });
    setLinks(generatedLinks);
  };

  const handleClear = () => {
    setUrl(''); // Clear the input field when the clear button is clicked
    setLinks([]); // Clear the generated links
  };

  return (
    <>
      <HeaderBottom />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="form-group">
              <label htmlFor="urlInput">Submit Your Website URLs (one per line)</label>
              <textarea
                className="form-control"
                id="urlInput"
                value={url}
                onChange={handleInputChange}
                placeholder="oceanmist.com\nkeyfood.com\nlesserevil.com\nbbiteam.com\ninfretailers.com\narmays.com"
                rows="7"
              />
            </div>
            <button className="btn btn-primary mr-2" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3">
            {links.length > 0 && (
              <div>
                <h5>Generated Links:</h5>
                <ul>
                  {links.map((link, index) => (
                    <li key={index} className='mt-2'>
                      <strong className='mr-2'>{link.number}.</strong> 
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Testapp;

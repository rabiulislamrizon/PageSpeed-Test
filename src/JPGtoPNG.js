import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function JPGtoPNG() {
    const [file, setFile] = useState(null);
    const [convertedFile, setConvertedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile && uploadedFile.type === 'image/jpeg') {
            setFile(uploadedFile);
            setConvertedFile(null); // Clear previous converted file
        } else {
            setError('Please upload a JPG file.');
        }
    };

    const convertToPng = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const data = reader.result;
                const image = new Image();
                image.src = data;

                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxDimension = 400;
                    let width = image.width;
                    let height = image.height;

                    // Resize image if necessary
                    if (width > height) {
                        if (width > maxDimension) {
                            height *= maxDimension / width;
                            width = maxDimension;
                        }
                    } else {
                        if (height > maxDimension) {
                            width *= maxDimension / height;
                            height = maxDimension;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(image, 0, 0, width, height);

                    // Convert to PNG format
                    resolve(canvas.toDataURL('image/png'));
                };

                image.onerror = () => reject('Error loading the image.');
            };

            reader.readAsDataURL(file);
        });
    };

    const handleConvert = async () => {
        if (file) {
            setLoading(true);
            setError('');

            try {
                const pngData = await convertToPng(file);
                setConvertedFile(pngData);
            } catch (err) {
                setError('Error converting the file. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="text-center mb-4">Convert JPG to PNG</h2>
                    <div className="card p-4 shadow-sm border-0">
                        <div className="form-group mb-3">
                            <label htmlFor="fileUpload">Upload JPG File:</label>
                            <input
                                id="fileUpload"
                                type="file"
                                accept="image/jpeg"
                                onChange={handleFileUpload}
                                className="form-control"
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleConvert}
                            disabled={!file || loading}
                        >
                            {loading ? 'Converting...' : 'Convert to PNG'}
                        </button>
                        {error && (
                            <div className="alert alert-danger mt-4" role="alert">
                                {error}
                            </div>
                        )}
                        {convertedFile && !loading && (
                            <div className="text-center mt-4">
                                <h3>Converted File:</h3>
                                <img
                                    src={convertedFile}
                                    alt="Converted PNG"
                                    className="img-fluid"
                                />
                                <div className="mt-3">
                                    <a
                                        href={convertedFile}
                                        download="converted.png"
                                        className="btn btn-primary"
                                    >
                                        Download PNG
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JPGtoPNG;

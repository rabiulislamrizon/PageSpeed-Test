import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';

function JPGtoPDF() {
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

    const convertToPDF = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const data = reader.result;
                const img = new Image();
                img.onload = () => {
                    const pdf = new jsPDF();
                    pdf.addImage(img, 'JPEG', 0, 0);
                    resolve(pdf.output('bloburl'));
                };
                img.onerror = () => reject('Error loading the image.');
                img.src = data;
            };

            reader.onerror = () => reject('Error reading the file.');
            reader.readAsDataURL(file);
        });
    };

    const handleConvert = async () => {
        if (file) {
            setLoading(true);
            setError('');

            try {
                const pdfData = await convertToPDF(file);
                setConvertedFile(pdfData);
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
                    <h2 className="text-center mb-4">Convert JPG to PDF</h2>
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
                            {loading ? 'Converting...' : 'Convert to PDF'}
                        </button>
                        {error && (
                            <div className="alert alert-danger mt-4" role="alert">
                                {error}
                            </div>
                        )}
                        {convertedFile && !loading && (
                            <div className="text-center mt-4">
                                <h3>Converted File:</h3>
                                <div className="mt-3">
                                    <a
                                        href={convertedFile}
                                        download="converted.pdf"
                                        className="btn btn-primary"
                                    >
                                        Download PDF
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

export default JPGtoPDF;

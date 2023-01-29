import React, { useState } from 'react';
import '../App.css';

const FileUpload = () => {
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');
    const [fileSelected, setFileSelected] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileSelected(file);          // If file is selected

        const reader = new FileReader();

        reader.onload = (e) => {
            setText(e.target.result);
        };

        reader.readAsText(file);    // Reading as text 
    };

    const submitFile = (event) => {
        event.preventDefault();
        if (!fileSelected) {
            alert("Please select file.")    // If no file selected before submitting
            return;
        }
        const response = fetch('/api/text', {   // Send out text to backend
            method: 'POST',
            body: JSON.stringify({ text: text }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response) {
            setResponse(response)
        }
    }
    return (
        <>
            {response && <alert>Document uploaded successfully</alert>} {/* After successfull response */}
            <form onSubmit={submitFile}>
                <div className='custom-file mb-4'>
                    <input type='file'
                        className='custom-file-input'
                        id='customFile'
                        onChange={handleFileUpload} />
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form >
        </>
    );
};

export default FileUpload;

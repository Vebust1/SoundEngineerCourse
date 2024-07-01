import React, { useState } from 'react';
import axios from 'axios';

const UploadAudio = () => {
    const [file, setFile] = useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFileUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("audio", file);

        axios.post("/upload/audio", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data);
            alert('File uploaded successfully');
        })
        .catch(error => {
            console.error('There was an error uploading the file!', error);
        });
    };

    return (
        <div>
            <h2>Upload Audio</h2>
            <form onSubmit={onFileUpload}>
                <input type="file" onChange={onFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export { UploadAudio };
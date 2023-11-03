import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [directory, setDirectory] = useState('');
  const [filesList, setFilesList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !courseId || !directory) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseId', courseId);
    formData.append('directory', directory);
    formData.append('originalname', file.name);
    formData.append('mimetype', file.type);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded:', response.data);
      setFile(null);
      setCourseId('');
      setDirectory('');
      loadFilesList(courseId, directory);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const loadFilesList = async (courseId, directory) => {
    try {
      const response = await axios.get(`http://localhost:3000/list/${courseId}/${directory}`);
      setFilesList(response.data);
    } catch (error) {
      console.error('Error fetching files list:', error);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="file-upload-container">
      <h2>File Upload</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Directory"
          value={directory}
          onChange={(e) => setDirectory(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        <h3>Uploaded Files</h3>
        <ul>
          {filesList.map((file) => (
            <li key={file.key}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.key}
              </a>
              <button onClick={() => handleFileSelect(file)}>Open</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedFile && (
        <div>
          <h3>Selected File</h3>
          <iframe src={selectedFile.url} title="Selected File" width="100%" height="400" />
        </div>
      )}
    </div>
  );
}

export default FileUpload;

import React, { useState } from 'react';
import "./App.css"
const App = () => {
  const [file, setFile] = useState(null);
  const [name, setname] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handlenameChange = (e) => {
    setname(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('File and name data uploaded successfully');
        // Handle success scenario here
      } else {
        console.error('Failed to upload file and name data');
        // Handle error scenario here
      }
    } catch (error) {
      console.error('Error uploading file and name data:', error);
      // Handle error scenario here
    }
  };
  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <h2>File Uploader</h2>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            value={name}
            onChange={handlenameChange}
          />
        </div>
        <div>
          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            name="file"
            accept="*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default App;

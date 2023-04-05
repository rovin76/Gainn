import React, { useState } from 'react';
import axios from "axios"
import "./App.css"
const App = () => {
  const [file, setFile] = useState(null);
  const [value, setValue] = useState(0)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8000/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    axios.post(url, formData, {
      onUploadProgress: progressEvent => {
        let { loaded, total } = progressEvent;
        setValue((loaded / total) * 100)
      },
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then((response) => {
      // console.log(response)        
      // if(response.data.message){
      //   setValue(100)
      // }
      console.log(response.data);

    });

  };


  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <h2>File Uploader</h2>
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
        <progress id="progressBar" value={value} max="100" style={{ width: "300px" }}></progress><br />
        <button type="submit">Submit</button>
      </form>
      { }
    </div>
  );
};
export default App;

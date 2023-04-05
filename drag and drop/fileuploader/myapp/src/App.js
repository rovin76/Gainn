import React, { useState } from 'react';
import "./App.css"
const App = () => {
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Drag And Drop</h2>
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
  )

};
export default App;

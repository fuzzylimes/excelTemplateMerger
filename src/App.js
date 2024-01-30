import { h, Component } from 'preact';
import { useState } from 'preact/hooks';
import './App.css';

const App = () => {
  const [sourceFilePath, setSourceFilePath] = useState('');
  const [inputFilePath, setInputFilePath] = useState('');

  const handleBrowseClick = async (setter) => {
    const path = await window.electron.openFileDialog();
    setter(path);
  };

  const handleMergeClick = async () => {
    try {
      const result = await window.electron.performMerge(sourceFilePath, inputFilePath);
      if (result) {
        alert(`Merged file saved to ${result}`);
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <div class='v-centered'>
      <div class="container">
        <section>
          <label>Template File</label>
          <input type="text" value={sourceFilePath} readOnly />
          <button onClick={() => handleBrowseClick(setSourceFilePath)}>Browse</button>
        </section>
        <section>
          <label>Excel File</label>
          <input type="text" value={inputFilePath} readOnly />
          <button onClick={() => handleBrowseClick(setInputFilePath)}>Browse</button>
        </section>
        <button onClick={handleMergeClick}>Merge</button>
      </div>
    </div>
  );
};

export default App;

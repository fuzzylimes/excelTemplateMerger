import { h, Component } from 'preact';
import { useState } from 'preact/hooks';

const App = () => {
  const [sourceFilePath, setSourceFilePath] = useState('');
  const [inputFilePath, setInputFilePath] = useState('');

  const handleBrowseClick = async (setter) => {
    const path = await window.electron.openFileDialog();
    setter(path);
  };

  const handleMergeClick = () => {
    // Send paths to the Electron backend
  };

  return (
    <div class="container">
      <section class="grid">
        <label>Source File</label>
        <input type="text" value={sourceFilePath} readOnly />
        <button onClick={() => handleBrowseClick(setSourceFilePath)}>Browse</button>
      </section>
      <section class="grid">
        <label>Input File</label>
        <input type="text" value={inputFilePath} readOnly />
        <button onClick={() => handleBrowseClick(setInputFilePath)}>Browse</button>
      </section>
      <button onClick={handleMergeClick}>Merge</button>
    </div>
  );
};

export default App;

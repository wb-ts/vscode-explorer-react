import React from 'react';
import { FileExplorer } from './components/fileExplorer/fileExplorer';

const App: React.FC = () => {
  return (
    <div className="App h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="w-full max-w-3xl rounded-lg shadow-xl">
        <div className="p-4 bg-gray-900 rounded-t-lg">
          <h1 className="text-2xl font-bold text-gray-100">Etside File Explorer</h1>
        </div>
        <FileExplorer />
      </div>
    </div>
  );
};

export default App;

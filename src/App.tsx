import React from 'react'
import './App.css'
import FileExplorer from './components/FileExplorer/FileExplorer'

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="px-4 py-2 bg-gray-400 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">File Explorer</h1>
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-2">
        <FileExplorer />
      </main>
    </div>
  );
};


export default App

import React from 'react';
import { Twitter } from 'lucide-react';
import TrustChecker from './components/TrustChecker';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Twitter className="text-blue-400 mr-2" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Kenny AI Trust Checker</h1>
        </div>
        <TrustChecker />
      </div>
    </div>
  );
}

export default App;
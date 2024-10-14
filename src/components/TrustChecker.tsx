import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const TrustChecker: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const checkTrust = async () => {
    setLoading(true);
    setResult('');
    try {
      const response = await axios.post('/api/check-trust', { userId });
      setResult(response.data.result);
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = `Server error: ${axiosError.response.status}`;
        } else if (axiosError.request) {
          // The request was made but no response was received
          errorMessage = 'No response received from server. Please check your internet connection.';
        }
      }
      setResult(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter X User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-4"
        onClick={checkTrust}
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Trust'}
      </button>
      {result && (
        <div className={`p-4 rounded ${result.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}>
          <h2 className="font-bold mb-2">Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default TrustChecker;
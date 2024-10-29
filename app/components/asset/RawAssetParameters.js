// RawAssetParameters.jsx
import React, { useState } from 'react';

export default function RawAssetParameters({ rawAssetParameters, setRawAssetParameters }) {
  const [newRawParam, setNewRawParam] = useState('');

  const handleAddRawParameter = () => {
    if (newRawParam && !rawAssetParameters.includes(newRawParam)) {
      setRawAssetParameters([...rawAssetParameters, newRawParam]);
      setNewRawParam('');
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Raw Asset Parameters</h3>
      <ul>
        {rawAssetParameters.map((param) => (
          <li key={param}>{param}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Parameter Name"
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={newRawParam}
        onChange={(e) => setNewRawParam(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleAddRawParameter}
      >
        Add Raw Parameter
      </button>
    </div>
  );
}

// LocationBuilder.jsx
import React, { useState } from 'react';

export default function LocationBuilder({ locations, setLocations }) {
  const [locationName, setLocationName] = useState('');
  const [locationParams, setLocationParams] = useState({});
  const [paramKey, setParamKey] = useState('');
  const [paramValue, setParamValue] = useState('');

  const addLocation = () => {
    if (locationName) {
      setLocations((prev) => ({
        ...prev,
        [locationName]: {
          locationName,
          locationParameters: locationParams,
        },
      }));
      setLocationName('');
      setLocationParams({});
    }
  };

  const addParameter = () => {
    if (paramKey) {
      setLocationParams((prev) => ({ ...prev, [paramKey]: parseFloat(paramValue) || paramValue }));
      setParamKey('');
      setParamValue('');
    }
  };

  return (
    <div className="mb-4 p-4 bg-white border rounded">
      <h2 className="text-xl font-semibold mb-2">Define Locations</h2>
      <input
        type="text"
        placeholder="Location Name"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Parameter Key"
          value={paramKey}
          onChange={(e) => setParamKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Parameter Value"
          value={paramValue}
          onChange={(e) => setParamValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button onClick={addParameter} className="px-4 py-2 bg-green-500 text-white rounded">
          Add Parameter
        </button>
      </div>
      <button onClick={addLocation} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
        Add Location
      </button>
    </div>
  );
}

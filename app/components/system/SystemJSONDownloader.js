// SystemEntryBuilder.jsx
import React, { useState } from 'react';

export default function SystemEntryBuilder({ systemEntries, setSystemEntries, brands, assets, locations }) {
  const [entry, setEntry] = useState({
    assetID: '',
    assetName: '',
    brandID: '',
    startTime: '',
    endTime: '',
    selectedLocations: {},
  });

  const addEntry = () => {
    setSystemEntries((prevEntries) => [...prevEntries, entry]);
    setEntry({
      assetID: '',
      assetName: '',
      brandID: '',
      startTime: '',
      endTime: '',
      selectedLocations: {},
    });
  };

  const handleLocationChange = (key, value) => {
    setEntry((prev) => ({
      ...prev,
      selectedLocations: { ...prev.selectedLocations, [key]: value },
    }));
  };

  return (
    <div className="mb-4 p-4 bg-white border rounded">
      <h2 className="text-xl font-semibold mb-2">Add System Entry</h2>
      <input
        type="text"
        placeholder="Asset ID"
        value={entry.assetID}
        onChange={(e) => setEntry({ ...entry, assetID: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <select
        value={entry.assetName}
        onChange={(e) => setEntry({ ...entry, assetName: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      >
        <option value="">Select Asset</option>
        {Object.keys(assets).map((asset) => (
          <option key={asset} value={asset}>
            {asset}
          </option>
        ))}
      </select>
      <select
        value={entry.brandID}
        onChange={(e) => setEntry({ ...entry, brandID: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      >
        <option value="">Select Brand</option>
        {Object.keys(brands).map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Start Time"
        value={entry.startTime}
        onChange={(e) => setEntry({ ...entry, startTime: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <input
        type="number"
        placeholder="End Time"
        value={entry.endTime}
        onChange={(e) => setEntry({ ...entry, endTime: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <div className="mb-2">
        {Object.keys(locations).map((location) => (
          <div key={location} className="mb-1">
            <label>{location}</label>
            <input
              type="text"
              placeholder="Location Value"
              value={entry.selectedLocations[location] || ''}
              onChange={(e) => handleLocationChange(location, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
      </div>
      <button onClick={addEntry} className="px-4 py-2 bg-green-500 text-white rounded mt-2">
        Add System Entry
      </button>
    </div>
  );
}

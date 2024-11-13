// SystemEntryBuilder.jsx
"use client"
import React, { useState, useEffect } from 'react';

export default function SystemEntryBuilder({ systemEntries, setSystemEntries, brands, assets, locations }) {
  const [entry, setEntry] = useState({
    assetID: '',
    assetName: '',
    brandID: '',
    startTime: '',
    endTime: '',
    selectedLocations: {},
  });

  // Populate required location keys from the selected asset
  useEffect(() => {
    if (entry.assetName) {
      const assetLocationKeys = Object.keys(assets[entry.assetName]?.locationParameters || {});
      const initialLocationMapping = assetLocationKeys.reduce((acc, loc) => {
        acc[loc] = ''; // Initialize each required location key with an empty value
        return acc;
      }, {});
      setEntry((prev) => ({
        ...prev,
        selectedLocations: initialLocationMapping,
      }));
    }
  }, [entry.assetName, assets]);

  const addEntry = () => {
    if (entry.assetID && entry.assetName && entry.brandID && entry.startTime && entry.endTime) {
      setSystemEntries((prevEntries) => [...prevEntries, entry]);
      setEntry({
        assetID: '',
        assetName: '',
        brandID: '',
        startTime: '',
        endTime: '',
        selectedLocations: {},
      });
    }
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

      {/* Location Mapping Section */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Map Asset Locations</h3>
        {Object.keys(entry.selectedLocations).map((location) => (
          <div key={location} className="mb-1">
            <label>{location}</label>
            <select
              value={entry.selectedLocations[location] || ''}
              onChange={(e) => handleLocationChange(location, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select system location</option>
              {Object.keys(locations).map((locKey) => (
                <option key={locKey} value={locKey}>
                  {locations[locKey].locationName}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button onClick={addEntry} className="px-4 py-2 bg-green-500 text-white rounded mt-2">
        Add System Entry
      </button>
    </div>
  );
}

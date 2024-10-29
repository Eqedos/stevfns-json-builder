// AssetLocationParameters.jsx
import React, { useState } from 'react';

export default function AssetLocationParameters({
  locationParameters,
  setLocationParameters,
}) {
  const [newLocation, setNewLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [newLocationParam, setNewLocationParam] = useState('');

  const handleAddLocation = () => {
    if (newLocation && !Object.keys(locationParameters).includes(newLocation)) {
      setLocationParameters({ ...locationParameters, [newLocation]: [] });
      setNewLocation('');
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleAddLocationParameter = () => {
    if (selectedLocation && newLocationParam) {
      setLocationParameters({
        ...locationParameters,
        [selectedLocation]: [
          ...(locationParameters[selectedLocation] || []),
          newLocationParam,
        ],
      });
      setNewLocationParam('');
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Asset Location Parameters</h3>

      {/* Add New Location */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="New Location Name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddLocation}
        >
          Add Location
        </button>
      </div>

      {/* Select Existing Location */}
      {Object.keys(locationParameters).length > 0 && (
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Select Location</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={selectedLocation}
            onChange={(e) => handleSelectLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {Object.keys(locationParameters).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Add Parameters to Selected Location */}
      {selectedLocation && (
        <div className="mb-2">
          <h4 className="text-md font-semibold mb-1">
            Parameters for Location: {selectedLocation}
          </h4>
          <ul>
            {locationParameters[selectedLocation]?.map((param) => (
              <li key={param}>{param}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Parameter Name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={newLocationParam}
            onChange={(e) => setNewLocationParam(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddLocationParameter}
          >
            Add Location Parameter
          </button>
        </div>
      )}
    </div>
  );
}

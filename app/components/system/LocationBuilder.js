// LocationBuilder.jsx
import React, { useState } from 'react';

export default function LocationBuilder({ locations, setLocations }) {
  const [newLocationName, setNewLocationName] = useState('');
  const [newParameterName, setNewParameterName] = useState('');
  const [newParameterValue, setNewParameterValue] = useState('');

  const handleAddLocation = () => {
    if (newLocationName) {
      setLocations((prev) => ({
        ...prev,
        [newLocationName]: { locationName: newLocationName, locationParameters: {} },
      }));
      setNewLocationName('');
    }
  };

  const handleAddParameter = (location) => {
    if (newParameterName) {
      setLocations((prev) => ({
        ...prev,
        [location]: {
          ...prev[location],
          locationParameters: {
            ...prev[location].locationParameters,
            [newParameterName]: parseFloat(newParameterValue) || newParameterValue,
          },
        },
      }));
      setNewParameterName('');
      setNewParameterValue('');
    }
  };

  const handleParameterChange = (location, paramName, value) => {
    setLocations((prev) => ({
      ...prev,
      [location]: {
        ...prev[location],
        locationParameters: {
          ...prev[location].locationParameters,
          [paramName]: parseFloat(value) || value,
        },
      },
    }));
  };

  const handleDeleteParameter = (location, paramName) => {
    setLocations((prev) => {
      const updatedLocation = { ...prev[location] };
      delete updatedLocation.locationParameters[paramName];
      return { ...prev, [location]: updatedLocation };
    });
  };

  const handleDeleteLocation = (location) => {
    setLocations((prev) => {
      const updatedLocations = { ...prev };
      delete updatedLocations[location];
      return updatedLocations;
    });
  };

  return (
    <div className="p-4 bg-white border rounded mb-4">
      <h2 className="text-xl font-semibold mb-4">Location Builder</h2>

      {/* Display Existing Locations */}
      {Object.entries(locations).map(([location, data]) => (
        <div key={location} className="mb-4 border p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{data.locationName}</h3>
            <button
              className="text-red-500"
              onClick={() => handleDeleteLocation(location)}
            >
              Delete Location
            </button>
          </div>

          {/* Display and Edit Parameters */}
          {Object.entries(data.locationParameters).map(([param, value]) => (
            <div key={param} className="flex items-center mb-2">
              <label className="w-1/3">{param}</label>
              <input
                type="text"
                value={value}
                className="w-2/3 p-2 border rounded"
                onChange={(e) => handleParameterChange(location, param, e.target.value)}
              />
              <button
                className="ml-2 text-red-500"
                onClick={() => handleDeleteParameter(location, param)}
              >
                Delete
              </button>
            </div>
          ))}

          {/* Add New Parameter */}
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder="Parameter Name"
              className="w-1/3 p-2 border rounded mr-2"
              value={newParameterName}
              onChange={(e) => setNewParameterName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Parameter Value"
              className="w-2/3 p-2 border rounded"
              value={newParameterValue}
              onChange={(e) => setNewParameterValue(e.target.value)}
            />
            <button
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => handleAddParameter(location)}
            >
              Add Parameter
            </button>
          </div>
        </div>
      ))}

      {/* Add New Location */}
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Location Name"
          className="w-full p-2 border rounded"
          value={newLocationName}
          onChange={(e) => setNewLocationName(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddLocation}
        >
          Add Location
        </button>
      </div>
    </div>
  );
}

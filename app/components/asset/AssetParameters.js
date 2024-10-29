// AssetParameters.jsx
import { useState } from 'react';
import OperandEditor, { AVAILABLE_OPERATIONS } from './OperandEditor';

export default function AssetParameters({
  rawAssetParameters,
  setRawAssetParameters,
  computedAssetParameters,
  setComputedAssetParameters,
  rawComponentParameters,
  locationParameters,
  setLocationParameters,
}) {
  const [newParam, setNewParam] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('add');
  const [operands, setOperands] = useState([]);

  const [newLocation, setNewLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [newLocationParam, setNewLocationParam] = useState('');

  const handleAddRawParameter = () => {
    if (newParam && !rawAssetParameters.includes(newParam)) {
      setRawAssetParameters([...rawAssetParameters, newParam]);
      setNewParam('');
    }
  };

  const handleAddComputedParameter = () => {
    if (newParam && selectedOperation && operands.length > 0) {
      setComputedAssetParameters({
        ...computedAssetParameters,
        [newParam]: {
          operation: selectedOperation,
          operands,
        },
      });
      setNewParam('');
      setSelectedOperation('add');
      setOperands([]);
    }
  };

  // Handling Location Parameters
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
      <h2 className="text-xl font-semibold mb-2">Asset Parameters</h2>

      {/* Raw Asset Parameters */}
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
          value={newParam}
          onChange={(e) => setNewParam(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddRawParameter}
        >
          Add Raw Parameter
        </button>
      </div>

      {/* Computed Asset Parameters */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Computed Asset Parameters</h3>
        <ul>
          {Object.keys(computedAssetParameters).map((param) => (
            <li key={param}>{param}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Parameter Name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={newParam}
          onChange={(e) => setNewParam(e.target.value)}
        />
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={selectedOperation}
          onChange={(e) => setSelectedOperation(e.target.value)}
        >
          {AVAILABLE_OPERATIONS.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>

        {/* Operands */}
        {operands.map((operand, index) => (
          <OperandEditor
            key={index}
            operand={operand}
            setOperand={(updatedOperand) => {
              const updatedOperands = [...operands];
              updatedOperands[index] = updatedOperand;
              setOperands(updatedOperands);
            }}
            rawAssetParameters={rawAssetParameters}
            computedAssetParameters={computedAssetParameters}
            rawComponentParameters={rawComponentParameters}
            locationParameters={locationParameters}
            restrictStateVariables={true}
          />
        ))}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
          onClick={() => setOperands([...operands, {}])}
        >
          Add Operand
        </button>
        <br />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleAddComputedParameter}
        >
          Add Computed Parameter
        </button>
      </div>

      {/* Asset Location Parameters */}
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
    </div>
  );
}

import { useState } from 'react';

export default function OperandEditor({ operand = {}, setOperand, rawParameters, locationParameters }) {
  const [operandType, setOperandType] = useState(operand.type || 'rawComponentParameter');
  const [selectedLocation, setSelectedLocation] = useState(operand.path ? operand.path[1] : '');
  const [selectedParameter, setSelectedParameter] = useState(operand.path ? operand.path[2] : '');
  const [nestedFunction, setNestedFunction] = useState(operand.operation ? operand : null);

  const handleOperandTypeChange = (type) => {
    setOperandType(type);
    setSelectedLocation('');
    setSelectedParameter('');
    setNestedFunction(null);

    if (type === 'nestedFunction') {
      setNestedFunction({ operation: 'multiply', operands: [] });
      setOperand({ operation: 'multiply', operands: [] });
    } else if (type === 'rawComponentParameter') {
      setOperand({ type, path: ['rawParameters'] });
    } else {
      setOperand({ type, path: ['locationParameters'] });
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setSelectedParameter('');
    setOperand({
      type: operandType,
      path: ['locationParameters', location],
    });
  };

  const handleParameterChange = (param) => {
    setSelectedParameter(param);
    setOperand({
      type: operandType,
      path: operandType === 'rawComponentParameter'
        ? ['rawParameters', param]
        : ['locationParameters', selectedLocation, param],
    });
  };

  const handleNestedFunctionChange = (operation, operands) => {
    setNestedFunction({ operation, operands });
    setOperand({ operation, operands });
  };

  return (
    <div className="border p-2 mb-2 rounded bg-gray-50">
      {/* Operand Type Dropdown */}
      <select
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={operandType}
        onChange={(e) => handleOperandTypeChange(e.target.value)}
      >
        <option value="rawComponentParameter">Raw Component Parameter</option>
        <option value="locationParameter">Location Parameter</option>
        <option value="nestedFunction">Nested Function</option>
      </select>

      {/* Raw Parameter Dropdown */}
      {operandType === 'rawComponentParameter' && (
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={selectedParameter}
          onChange={(e) => handleParameterChange(e.target.value)}
        >
          <option value="">Select Raw Parameter</option>
          {rawParameters.map((param) => (
            <option key={param} value={param}>
              {param}
            </option>
          ))}
        </select>
      )}

      {/* Location and Location Parameter Dropdowns */}
      {operandType === 'locationParameter' && (
        <>
          {/* Location Dropdown */}
          <select
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={selectedLocation}
            onChange={(e) => handleLocationChange(e.target.value)}
          >
            <option value="">Select Location</option>
            {Object.keys(locationParameters).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          {/* Parameter within Selected Location */}
          {selectedLocation && (
            <select
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={selectedParameter}
              onChange={(e) => handleParameterChange(e.target.value)}
            >
              <option value="">Select Parameter in {selectedLocation}</option>
              {locationParameters[selectedLocation].map((param) => (
                <option key={param} value={param}>
                  {param}
                </option>
              ))}
            </select>
          )}
        </>
      )}

      {/* Nested Function Editor */}
      {operandType === 'nestedFunction' && (
        <NestedFunctionEditor
          nestedFunction={nestedFunction}
          setNestedFunction={handleNestedFunctionChange}
          rawParameters={rawParameters}
          locationParameters={locationParameters}
        />
      )}
    </div>
  );
}

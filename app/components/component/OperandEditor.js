import { useState } from 'react';
import NestedFunctionEditor from './NestedFunctionEditor';

export const AVAILABLE_OPERATIONS = [
  'multiply', 'neg_identity', 'add', 'subtract', 'divide', 
  'asin', 'cos', 'max', 'maximum', 'radians', 
  'sin', 'sqrt', 'square', 'sum', 'sum_squares', 'identity'
];

export default function OperandEditor({ 
  operand = {}, 
  setOperand, 
  rawParameters = [], 
  locationParameters = {}, 
  stateVariables = [], 
  computedParameters = {}, 
  restrictStateVariables = false 
}) {
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
    } else {
      setOperand({ type, path: [] });
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setSelectedParameter('');
    setOperand({ type: 'locationParameter', path: ['locationParameters', location] });
  };

  const handleParameterChange = (param) => {
    let path = [];
    if (operandType === 'rawComponentParameter') {
      path = ['rawParameters', param];
    } else if (operandType === 'locationParameter') {
      path = ['locationParameters', selectedLocation, param];
    } else if (operandType === 'computedParameter') {
      path = ['computedParameters', param];
    } else if (operandType === 'stateVariable') {
      path = ['stateVariables', param, 'optimisationVariable'];
    }
    setSelectedParameter(param);
    setOperand({ type: operandType, path });
  };

  const handleNestedFunctionChange = (updatedNestedFunction) => {
    setNestedFunction(updatedNestedFunction);
    setOperand(updatedNestedFunction);
  };

  return (
    <div className="border p-2 mb-2 rounded bg-gray-50">
      <label className="block text-sm font-medium mb-2">Operand Type</label>
      <select
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={operandType}
        onChange={(e) => handleOperandTypeChange(e.target.value)}
      >
        <option value="rawComponentParameter">Raw Component Parameter</option>
        <option value="locationParameter">Location Parameter</option>
        <option value="computedParameter">Computed Parameter</option>
        {!restrictStateVariables && <option value="stateVariable">State Variable</option>}
        <option value="nestedFunction">Nested Function</option>
      </select>

      {/* Parameter Selection */}
      {operandType === 'rawComponentParameter' && (
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={selectedParameter}
          onChange={(e) => handleParameterChange(e.target.value)}
        >
          <option value="">Select Parameter</option>
          {rawParameters.map((param) => (
            <option key={param} value={param}>
              {param}
            </option>
          ))}
        </select>
      )}

      {/* Location Parameter Selection */}
      {operandType === 'locationParameter' && (
        <>
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

          {selectedLocation && (
            <select
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={selectedParameter}
              onChange={(e) => handleParameterChange(e.target.value)}
            >
              <option value="">Select Parameter</option>
              {locationParameters[selectedLocation]?.map((param) => (
                <option key={param} value={param}>
                  {param}
                </option>
              ))}
            </select>
          )}
        </>
      )}

      {/* Computed Parameter Selection */}
      {operandType === 'computedParameter' && (
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={selectedParameter}
          onChange={(e) => handleParameterChange(e.target.value)}
        >
          <option value="">Select Parameter</option>
          {Object.keys(computedParameters).map((param) => (
            <option key={param} value={param}>
              {param}
            </option>
          ))}
        </select>
      )}

      {/* State Variable Selection */}
      {operandType === 'stateVariable' && (
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={selectedParameter}
          onChange={(e) => handleParameterChange(e.target.value)}
        >
          <option value="">Select State Variable</option>
          {stateVariables.map((variable) => (
            <option key={variable.name} value={variable.name}>
              {variable.name}
            </option>
          ))}
        </select>
      )}

      {/* Nested Function Editor */}
      {operandType === 'nestedFunction' && (
        <NestedFunctionEditor
          nestedFunction={nestedFunction}
          setNestedFunction={handleNestedFunctionChange}
          rawParameters={rawParameters}
          locationParameters={locationParameters}
          stateVariables={stateVariables}
        />
      )}
    </div>
  );
}

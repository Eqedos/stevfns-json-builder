// OperandEditor.jsx
import React, { useState } from 'react';
import NestedFunctionEditor from './NestedFunctionEditor';
import { AVAILABLE_OPERATIONS } from './availableOperations';

export default function OperandEditor({
  operand = {},
  setOperand,
  rawAssetParameters = [],
  computedAssetParameters = {},
  rawComponentParameters = {},
  computedComponentParameters = {},
  locationParameters = {},
  stateVariables = {},
  componentNames = [],
  restrictStateVariables = false,
}) {
  const [operandType, setOperandType] = useState(operand.type || 'rawAssetParameter');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [selectedParameter, setSelectedParameter] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStateVariable, setSelectedStateVariable] = useState('');
  const [nestedFunction, setNestedFunction] = useState(operand.operation ? operand : null);

  const handleOperandTypeChange = (type) => {
    setOperandType(type);
    setSelectedComponent('');
    setSelectedParameter('');
    setSelectedLocation('');
    setSelectedStateVariable('');
    setNestedFunction(null);

    if (type === 'nestedFunction') {
      const initialNestedFunction = { operation: 'add', operands: [] };
      setNestedFunction(initialNestedFunction);
      setOperand(initialNestedFunction);
    } else {
      setOperand({ type, path: [] });
    }
  };

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setSelectedParameter('');
    setSelectedStateVariable('');
  };

  const handleParameterChange = (param) => {
    let path = [];
    switch (operandType) {
      case 'rawAssetParameter':
        path = ['assetParameters', param];
        break;
      case 'computedAssetParameter':
        path = ['computedAssetParameters', param];
        break;
      case 'rawComponentParameter':
        path = ['components', selectedComponent, 'rawParameters', param];
        break;
      case 'computedComponentParameter':
        path = ['components', selectedComponent, 'computedParameters', param];
        break;
      case 'locationParameter':
        path = ['locationParameters', selectedLocation, param];
        break;
      default:
        break;
    }
    setSelectedParameter(param);
    setOperand({ type: operandType, path });
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setSelectedParameter('');
  };

  const handleStateVariableChange = (stateVar) => {
    const path = [
      'components',
      selectedComponent,
      'stateVariables',
      stateVar,
      'optimisationVariable',
    ];
    setSelectedStateVariable(stateVar);
    setOperand({ type: 'stateVariable', path });
  };

  const handleNestedFunctionChange = (nestedFunc) => {
    setNestedFunction(nestedFunc);
    setOperand(nestedFunc);
  };

  return (
    <div className="border p-2 mb-2 rounded bg-gray-50">
      {/* Operand Type Selection */}
      <select
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={operandType}
        onChange={(e) => handleOperandTypeChange(e.target.value)}
      >
        <option value="rawAssetParameter">Raw Asset Parameter</option>
        <option value="computedAssetParameter">Computed Asset Parameter</option>
        <option value="rawComponentParameter">Raw Component Parameter</option>
        <option value="computedComponentParameter">Computed Component Parameter</option>
        <option value="locationParameter">Location Parameter</option>
        {!restrictStateVariables && <option value="stateVariable">State Variable</option>}
        <option value="nestedFunction">Nested Function</option>
      </select>

      {/* Operand Selection */}
      {/* Raw and Computed Asset Parameters */}
      {['rawAssetParameter', 'computedAssetParameter'].includes(operandType) && (
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={selectedParameter}
          onChange={(e) => handleParameterChange(e.target.value)}
        >
          <option value="">Select Parameter</option>
          {operandType === 'rawAssetParameter' &&
            rawAssetParameters.map((param) => (
              <option key={param} value={param}>
                {param}
              </option>
            ))}
          {operandType === 'computedAssetParameter' &&
            Object.keys(computedAssetParameters).map((param) => (
              <option key={param} value={param}>
                {param}
              </option>
            ))}
        </select>
      )}

      {/* Component Selection for Component Parameters and State Variables */}
      {['rawComponentParameter', 'computedComponentParameter', 'stateVariable'].includes(
        operandType
      ) && (
        <>
          <select
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={selectedComponent}
            onChange={(e) => handleComponentChange(e.target.value)}
          >
            <option value="">Select Component</option>
            {componentNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* Parameter or State Variable Selection */}
          {selectedComponent && (
            <>
              {/* Parameters */}
              {['rawComponentParameter', 'computedComponentParameter'].includes(operandType) && (
                <select
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={selectedParameter}
                  onChange={(e) => handleParameterChange(e.target.value)}
                >
                  <option value="">Select Parameter</option>
                  {operandType === 'rawComponentParameter' &&
                    rawComponentParameters[selectedComponent]?.map((param) => (
                      <option key={param} value={param}>
                        {param}
                      </option>
                    ))}
                  {operandType === 'computedComponentParameter' &&
                    computedComponentParameters[selectedComponent]?.map((param) => (
                      <option key={param} value={param}>
                        {param}
                      </option>
                    ))}
                </select>
              )}

              {/* State Variables */}
              {operandType === 'stateVariable' && (
                <select
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={selectedStateVariable}
                  onChange={(e) => handleStateVariableChange(e.target.value)}
                >
                  <option value="">Select State Variable</option>
                  {stateVariables[selectedComponent]?.map((sv) => (
                    <option key={sv} value={sv}>
                      {sv}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}
        </>
      )}

      {/* Location Parameters */}
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

      {/* Nested Function */}
      {operandType === 'nestedFunction' && (
        <NestedFunctionEditor
          nestedFunction={nestedFunction}
          setNestedFunction={handleNestedFunctionChange}
          rawAssetParameters={rawAssetParameters}
          computedAssetParameters={computedAssetParameters}
          rawComponentParameters={rawComponentParameters}
          computedComponentParameters={computedComponentParameters}
          locationParameters={locationParameters}
          stateVariables={stateVariables}
          componentNames={componentNames}
          restrictStateVariables={restrictStateVariables}
        />
      )}
    </div>
  );
}

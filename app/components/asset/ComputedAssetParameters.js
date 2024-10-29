// ComputedAssetParameters.jsx
import React, { useState } from 'react';
import OperandEditor from './OperandEditor';
import { AVAILABLE_OPERATIONS } from './availableOperations';

export default function ComputedAssetParameters({
  computedAssetParameters,
  setComputedAssetParameters,
  rawAssetParameters,
  computedAssetParametersList,
  rawComponentParameters,
  computedComponentParameters,
  componentNames,
  locationParameters,
}) {
  const [newComputedParam, setNewComputedParam] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('add');
  const [operands, setOperands] = useState([]);

  const handleAddComputedParameter = () => {
    if (newComputedParam && selectedOperation && operands.length > 0) {
      setComputedAssetParameters({
        ...computedAssetParameters,
        [newComputedParam]: {
          operation: selectedOperation,
          operands,
        },
      });
      setNewComputedParam('');
      setSelectedOperation('add');
      setOperands([]);
    }
  };

  return (
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
        value={newComputedParam}
        onChange={(e) => setNewComputedParam(e.target.value)}
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
          computedAssetParameters={computedAssetParametersList}
          rawComponentParameters={rawComponentParameters}
          computedComponentParameters={computedComponentParameters}
          componentNames={componentNames}
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
  );
}

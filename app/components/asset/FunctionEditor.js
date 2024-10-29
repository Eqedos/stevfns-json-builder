// FunctionEditor.jsx
import React, { useState } from 'react';
import OperandEditor from './OperandEditor';
import { AVAILABLE_OPERATIONS } from './availableOperations';

export default function FunctionEditor({
  functionName,
  func,
  setFunc,
  rawAssetParameters,
  computedAssetParameters,
  rawComponentParameters,
  computedComponentParameters,
  locationParameters,
  stateVariables,
  componentNames,
}) {
  const [operation, setOperation] = useState(func?.operation || 'add');
  const [operands, setOperands] = useState(func?.operands || []);

  const handleSaveFunction = () => {
    if (operation && operands.length > 0) {
      setFunc({
        operation,
        operands,
      });
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{functionName}</h2>
      <select
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
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
          computedComponentParameters={computedComponentParameters}
          locationParameters={locationParameters}
          stateVariables={stateVariables}
          componentNames={componentNames}
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
        onClick={handleSaveFunction}
      >
        Save {functionName}
      </button>
    </div>
  );
}

// NestedFunctionEditor.jsx
import React, { useState } from 'react';
import OperandEditor from './OperandEditor';
import { AVAILABLE_OPERATIONS } from './availableOperations';

export default function NestedFunctionEditor({
  nestedFunction = { operation: 'add', operands: [] },
  setNestedFunction,
  rawAssetParameters,
  computedAssetParameters,
  rawComponentParameters,
  computedComponentParameters,
  locationParameters,
  stateVariables,
  componentNames,
  restrictStateVariables = false,
}) {
  const [operation, setOperation] = useState(nestedFunction.operation || 'add');
  const [operands, setOperands] = useState(nestedFunction.operands || []);

  const handleOperationChange = (op) => {
    setOperation(op);
    const updatedFunction = { operation: op, operands };
    setNestedFunction(updatedFunction);
  };

  const handleOperandChange = (index, updatedOperand) => {
    const updatedOperands = [...operands];
    updatedOperands[index] = updatedOperand;
    setOperands(updatedOperands);
    setNestedFunction({ operation, operands: updatedOperands });
  };

  const handleAddOperand = () => {
    const updatedOperands = [...operands, {}];
    setOperands(updatedOperands);
    setNestedFunction({ operation, operands: updatedOperands });
  };

  return (
    <div className="border p-2 mb-2 rounded bg-gray-100">
      {/* Operation Selection */}
      <select
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={operation}
        onChange={(e) => handleOperationChange(e.target.value)}
      >
        {AVAILABLE_OPERATIONS.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>

      {/* Operands */}
      {operands.map((operand, index) => (
        <div key={index} className="ml-4">
          <OperandEditor
            operand={operand}
            setOperand={(updatedOperand) => handleOperandChange(index, updatedOperand)}
            rawAssetParameters={rawAssetParameters}
            computedAssetParameters={computedAssetParameters}
            rawComponentParameters={rawComponentParameters}
            computedComponentParameters={computedComponentParameters}
            locationParameters={locationParameters}
            stateVariables={stateVariables}
            componentNames={componentNames}
            restrictStateVariables={restrictStateVariables}
          />
        </div>
      ))}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
        onClick={handleAddOperand}
      >
        Add Operand
      </button>
    </div>
  );
}

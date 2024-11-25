import { useState } from 'react';
import OperandEditor, { AVAILABLE_OPERATIONS } from './OperandEditor';

export default function NestedFunctionEditor({ 
  nestedFunction = {}, 
  setNestedFunction, 
  rawParameters, 
  locationParameters, 
  stateVariables 
}) {
  const [operation, setOperation] = useState(nestedFunction.operation || 'multiply');
  const [operands, setOperands] = useState(nestedFunction.operands || []);

  const handleAddNestedOperand = () => {
    setOperands([...operands, {}]); // Add an empty operand
  };

  const handleNestedOperandChange = (index, updatedOperand) => {
    const updatedOperands = [...operands];
    updatedOperands[index] = updatedOperand;
    setOperands(updatedOperands);
    setNestedFunction({ operation, operands: updatedOperands });
  };

  const handleOperationChange = (newOperation) => {
    setOperation(newOperation);
    setNestedFunction({ operation: newOperation, operands });
  };

  return (
    <div className="border p-2 mb-2 rounded bg-gray-100">
      <label className="block mb-2 text-md font-semibold">Operation</label>
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

      <h4 className="text-md font-semibold mt-2">Nested Operands</h4>
      {operands.map((operand, index) => (
        <OperandEditor
          key={index}
          operand={operand}
          setOperand={(updatedOperand) => handleNestedOperandChange(index, updatedOperand)}
          rawParameters={rawParameters}
          locationParameters={locationParameters}
          stateVariables={stateVariables}
        />
      ))}

      <button className="px-4 py-2 bg-blue-500 text-white rounded mt-2" onClick={handleAddNestedOperand}>
        Add Nested Operand
      </button>
    </div>
  );
}

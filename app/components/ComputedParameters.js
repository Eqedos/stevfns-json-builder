import { useState } from 'react';
import OperandEditor from './OperandEditor';
export default function ComputedParameters({ computedParameters, setComputedParameters, rawParameters, locationParameters }) {
  const [newParamKey, setNewParamKey] = useState('');
  const [operation, setOperation] = useState('multiply');
  const [operands, setOperands] = useState([]);

  const handleAddComputedParameter = () => {
    if (newParamKey && operation) {
      setComputedParameters({
        ...computedParameters,
        [newParamKey]: {
          operation,
          operands,
        },
      });
      setNewParamKey('');
      setOperation('multiply');
      setOperands([]);
    }
  };

  const handleDeleteComputedParameter = (key) => {
    const updatedParams = { ...computedParameters };
    delete updatedParams[key];
    setComputedParameters(updatedParams);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4 mb-2">Computed Parameters</h2>
      
      {/* Existing Computed Parameters */}
      {Object.entries(computedParameters).map(([key, param]) => (
        <div key={key} className="border p-4 mb-2 rounded bg-white">
          <h3 className="text-lg font-semibold">{key}</h3>
          <p>Operation: {param.operation}</p>
          <p>Operands:</p>
          <ul>
            {param.operands.map((operand, index) => (
              <li key={index}>
                Type: {operand.type}, Path: {operand.path.join(' -> ')}
              </li>
            ))}
          </ul>
          <button className="px-2 py-1 bg-red-500 text-white rounded mt-2" onClick={() => handleDeleteComputedParameter(key)}>
            Delete
          </button>
        </div>
      ))}

      {/* Add New Computed Parameter */}
      <div className="border p-4 mb-2 rounded bg-white">
        <h3 className="text-lg font-semibold">Add New Computed Parameter</h3>
        
        <input
          type="text"
          placeholder="Parameter Key"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={newParamKey}
          onChange={(e) => setNewParamKey(e.target.value)}
        />

        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="multiply">Multiply</option>
          {/* Add more operations here if needed */}
        </select>

        <h4 className="text-md font-semibold mt-2">Operands</h4>
        {operands.map((operand, index) => (
          <OperandEditor
            key={index}
            index={index}
            operand={operand}
            setOperand={(updatedOperand) => {
              const updatedOperands = [...operands];
              updatedOperands[index] = updatedOperand;
              setOperands(updatedOperands);
            }}
            rawParameters={rawParameters}
            locationParameters={locationParameters}
          />
        ))}

        <button className="px-4 py-2 bg-blue-500 text-white rounded mt-2" onClick={() => setOperands([...operands, {}])}>
          Add Operand
        </button>

        <button className="px-4 py-2 bg-green-500 text-white rounded mt-2" onClick={handleAddComputedParameter}>
          Add Computed Parameter
        </button>
      </div>
    </div>
  );
}

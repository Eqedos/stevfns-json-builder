import { useState } from 'react';
import OperandEditor, { AVAILABLE_OPERATIONS } from './OperandEditor';

export default function Edges({ edges, setEdges, stateVariables, resourceNodes, rawParameters, locationParameters, computedParameters }) {
  const [newEdgeKey, setNewEdgeKey] = useState('');
  const [type, setType] = useState('TemporalTime');
  const [operation, setOperation] = useState('neg_identity');
  const [conversionFunction, setConversionFunction] = useState({ operation: 'neg_identity', operands: [] });
  const [resourceNodeName, setResourceNodeName] = useState('');
  const [direction, setDirection] = useState('out');
  const [transportTime, setTransportTime] = useState(0);
  const [specificTime, setSpecificTime] = useState('');

  const handleAddEdge = () => {
    if (newEdgeKey && resourceNodeName) {
      setEdges({
        ...edges,
        [newEdgeKey]: {
          type,
          conversionFunction: { operation, operands: conversionFunction.operands },
          resourceNodeName,
          transportTime: type === 'TemporalTime' ? transportTime : '',
          specificTime: type === 'SpecificTime' ? specificTime : '',
          direction,
        },
      });
      setNewEdgeKey('');
      setType('TemporalTime');
      setOperation('neg_identity');
      setConversionFunction({ operation: 'neg_identity', operands: [] });
      setResourceNodeName('');
      setDirection('out');
      setTransportTime(0);
      setSpecificTime('');
    }
  };

  const handleDeleteEdge = (key) => {
    const updatedEdges = { ...edges };
    delete updatedEdges[key];
    setEdges(updatedEdges);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4 mb-2">Edges</h2>

      {/* Existing Edges */}
      {Object.entries(edges).map(([key, edge]) => (
        <div key={key} className="border p-4 mb-2 rounded bg-white">
          <h3 className="text-lg font-semibold">{key}</h3>
          <p>Type: {edge.type}</p>
          <p>Direction: {edge.direction}</p>
          <p>Resource Node Name: {edge.resourceNodeName}</p>
          <p>Conversion Function Operation: {edge.conversionFunction.operation}</p>
          <button className="px-2 py-1 bg-red-500 text-white rounded mt-2" onClick={() => handleDeleteEdge(key)}>
            Delete
          </button>
        </div>
      ))}

      {/* Add New Edge */}
      <div className="border p-4 mb-2 rounded bg-white">
        <h3 className="text-lg font-semibold">Add New Edge</h3>

        <input
          type="text"
          placeholder="Edge Key"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={newEdgeKey}
          onChange={(e) => setNewEdgeKey(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="TemporalTime">TemporalTime</option>
          <option value="SpecificTime">SpecificTime</option>
        </select>

        <label className="block text-sm font-medium mb-1">Resource Node Name</label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={resourceNodeName}
          onChange={(e) => setResourceNodeName(e.target.value)}
        >
          <option value="">Select Resource Node</option>
          {resourceNodes.map((node) => (
            <option key={node.resourceNodeKey} value={node.resourceNodeKey}>
              {node.resourceNodeKey}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium mb-1">Direction</label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        >
          <option value="out">Out</option>
          <option value="in">In</option>
        </select>

        {type === 'TemporalTime' && (
          <>
            <label className="block text-sm font-medium mb-1">Transport Time</label>
            <input
              type="number"
              placeholder="Transport Time"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={transportTime}
              onChange={(e) => setTransportTime(parseInt(e.target.value))}
            />
          </>
        )}

        {type === 'SpecificTime' && (
          <>
            <label className="block text-sm font-medium mb-1">Specific Time</label>
            <input
              type="text"
              placeholder="Specific Time"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={specificTime}
              onChange={(e) => setSpecificTime(e.target.value)}
            />
          </>
        )}

        <label className="block text-sm font-medium mb-1">Conversion Function Operation</label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={operation}
          onChange={(e) => {
            setOperation(e.target.value);
            setConversionFunction({ ...conversionFunction, operation: e.target.value });
          }}
        >
          {AVAILABLE_OPERATIONS.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>

        <h4 className="text-md font-semibold mt-2">Conversion Function Operands</h4>
        {conversionFunction.operands.map((operand, index) => (
          <OperandEditor
            key={index}
            operand={operand}
            setOperand={(updatedOperand) => {
              const updatedOperands = [...conversionFunction.operands];
              updatedOperands[index] = updatedOperand;
              setConversionFunction({ ...conversionFunction, operands: updatedOperands });
            }}
            rawParameters={rawParameters}
            locationParameters={locationParameters}
            computedParameters={computedParameters}
            stateVariables={stateVariables}
          />
        ))}

        <button className="px-4 py-2 bg-blue-500 text-white rounded mt-2" onClick={() => setConversionFunction({ ...conversionFunction, operands: [...conversionFunction.operands, {}] })}>
          Add Operand
        </button>

        <button className="px-4 py-2 bg-green-500 text-white rounded mt-2" onClick={handleAddEdge}>
          Add Edge
        </button>
      </div>
    </div>
  );
}

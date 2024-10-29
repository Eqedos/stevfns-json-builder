import React from 'react';
import ResourceNode from './ResourceNode';

export default function ResourceNodes({ resourceNodes = [], setResourceNodes }) {
  const handleAddResourceNode = () => {
    setResourceNodes([
      ...resourceNodes,
      {
        resourceNodeKey: '',
        resourceName: '',
        isPublic: false,
        location: '',
        isInequality: false,
        isExpanded: false,
      },
    ]);
  };

  const handleResourceNodeChange = (index, field, value) => {
    const updatedNodes = [...resourceNodes];
    updatedNodes[index][field] = value; // Use the value directly
    setResourceNodes(updatedNodes);
  };

  const handleDeleteResourceNode = (index) => {
    setResourceNodes(resourceNodes.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4 mb-2">Resource Nodes</h2>
      {resourceNodes.map((node, index) => (
        <ResourceNode
          key={index}
          index={index}
          node={node}
          onChange={handleResourceNodeChange}
          onDelete={handleDeleteResourceNode}
        />
      ))}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
        onClick={handleAddResourceNode}
      >
        Add Resource Node
      </button>
    </div>
  );
}

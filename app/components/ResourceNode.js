export default function ResourceNode({ index, node, onChange, onDelete }) {
    const handleChange = (field, value) => onChange(index, field, value);
  
    return (
      <div className="border p-4 mb-2 rounded bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Resource Node {index + 1}</h3>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => onDelete(index)}
          >
            Delete
          </button>
        </div>
  
        <input
          type="text"
          placeholder="Node Key"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={node.resourceNodeKey}
          onChange={(e) => handleChange('resourceNodeKey', e.target.value)}
        />
  
        <input
          type="text"
          placeholder="Resource Name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={node.resourceName}
          onChange={(e) => handleChange('resourceName', e.target.value)}
        />
  
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={node.isPublic}
          onChange={(e) => handleChange('isPublic', e.target.value)}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
  
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={node.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
  
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={node.isInequality}
          onChange={(e) => handleChange('isInequality', e.target.value)}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    );
  }
  
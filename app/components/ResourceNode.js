export default function ResourceNode({ index, node, onChange, onDelete }) {
  const handleChange = (field, value) => {
    const parsedValue = field === 'isPublic' || field === 'isInequality' ? value === 'true' : value;
    onChange(index, field, parsedValue);
  };

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

      {/* Node Key */}
      <label className="block text-sm font-medium mb-1">Node Key</label>
      <input
        type="text"
        placeholder="Node Key"
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={node.resourceNodeKey}
        onChange={(e) => handleChange('resourceNodeKey', e.target.value)}
      />

      {/* Resource Name */}
      <label className="block text-sm font-medium mb-1">Resource Name</label>
      <input
        type="text"
        placeholder="Resource Name"
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={node.resourceName}
        onChange={(e) => handleChange('resourceName', e.target.value)}
      />

      {/* Public Status */}
      <label className="block text-sm font-medium mb-1">Is Public</label>
      <select
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={node.isPublic}
        onChange={(e) => handleChange('isPublic', e.target.value)}
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>

      {/* Location */}
      <label className="block text-sm font-medium mb-1">Location</label>
      <input
        type="text"
        placeholder="Location"
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={node.location}
        onChange={(e) => handleChange('location', e.target.value)}
      />

      {/* Inequality Status */}
      <label className="block text-sm font-medium mb-1">Is Inequality</label>
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

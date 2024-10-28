export default function StateVariable({ index, variable, onChange, onDelete }) {
    const handleChange = (field, value) => onChange(index, field, value);
  
    return (
      <div className="border p-4 mb-2 rounded bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">State Variable {index + 1}</h3>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => onDelete(index)}
          >
            Delete
          </button>
        </div>
  
        <input
          type="text"
          placeholder="Variable Name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={variable.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
  
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={variable.temporal}
          onChange={(e) => handleChange('temporal', e.target.value)}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
  
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min Bound"
            className="w-full p-2 border border-gray-300 rounded"
            value={variable.bounds.min}
            onChange={(e) => handleChange('bounds', { ...variable.bounds, min: parseInt(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Max Bound"
            className="w-full p-2 border border-gray-300 rounded"
            value={variable.bounds.max}
            onChange={(e) => handleChange('bounds', { ...variable.bounds, max: parseInt(e.target.value) })}
          />
        </div>
      </div>
    );
  }
  
export default function RawParameters({ rawParameters = [], setRawParameters }) {
    const handleAddRawParameter = () => {
      setRawParameters([...rawParameters, '']);
    };
  
    const handleRawParameterChange = (index, value) => {
      const updatedRawParameters = [...rawParameters];
      updatedRawParameters[index] = value;
      setRawParameters(updatedRawParameters);
    };
  
    const handleDeleteRawParameter = (index) => {
      setRawParameters(rawParameters.filter((_, i) => i !== index));
    };
  
    return (
      <div>
        <h2 className="text-xl font-semibold mt-4 mb-2">Raw Parameters</h2>
        {rawParameters.map((param, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder={`Parameter ${index + 1}`}
              className="w-full p-2 border border-gray-300 rounded"
              value={param}
              onChange={(e) => handleRawParameterChange(index, e.target.value)}
            />
            <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDeleteRawParameter(index)}>
              Delete
            </button>
          </div>
        ))}
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAddRawParameter}>
          Add Raw Parameter
        </button>
      </div>
    );
  }
  
export default function LocationParameters({ locationParameters = {}, setLocationParameters }) {
    const handleAddLocationParameter = () => {
      setLocationParameters({ ...locationParameters, '': [] });
    };
  
    const handleLocationParameterChange = (location, parameter, value) => {
      const updatedLocationParameters = { ...locationParameters };
      if (!updatedLocationParameters[location]) updatedLocationParameters[location] = [];
      updatedLocationParameters[location] = updatedLocationParameters[location].map((param) =>
        param === parameter ? value : param
      );
      setLocationParameters(updatedLocationParameters);
    };
  
    const handleAddParameterToLocation = (location) => {
      setLocationParameters({ ...locationParameters, [location]: [...(locationParameters[location] || []), ''] });
    };
  
    const handleDeleteLocation = (location) => {
      const updatedLocationParameters = { ...locationParameters };
      delete updatedLocationParameters[location];
      setLocationParameters(updatedLocationParameters);
    };
  
    return (
      <div>
        <h2 className="text-xl font-semibold mt-4 mb-2">Location Parameters</h2>
        {Object.entries(locationParameters).map(([location, parameters], index) => (
          <div key={index} className="mb-4 p-2 border rounded bg-white">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                placeholder="Location Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={location}
                onChange={(e) => {
                  const newLocationParameters = { ...locationParameters };
                  newLocationParameters[e.target.value] = newLocationParameters[location];
                  delete newLocationParameters[location];
                  setLocationParameters(newLocationParameters);
                }}
              />
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDeleteLocation(location)}>
                Delete Location
              </button>
            </div>
  
            {parameters.map((param, paramIndex) => (
              <div key={paramIndex} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Parameter ${paramIndex + 1}`}
                  className="w-full p-2 border border-gray-300 rounded"
                  value={param}
                  onChange={(e) => handleLocationParameterChange(location, param, e.target.value)}
                />
              </div>
            ))}
            <button className="px-4 py-2 bg-green-500 text-white rounded mt-2" onClick={() => handleAddParameterToLocation(location)}>
              Add Parameter to Location
            </button>
          </div>
        ))}
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAddLocationParameter}>
          Add Location
        </button>
      </div>
    );
  }
  
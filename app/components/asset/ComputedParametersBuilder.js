// ComputedParametersBuilder.jsx
import React, { useState } from 'react';

export default function ComputedParametersBuilder({
  computedAssetParametersList,
  componentNames,
  computedComponentParameters,
}) {
  const [assetId, setAssetId] = useState('');
  const [computedAssetParamInputs, setComputedAssetParamInputs] = useState({});
  const [computedComponentParamInputs, setComputedComponentParamInputs] = useState({});

  const handleComputedAssetParamChange = (param, value) => {
    setComputedAssetParamInputs((prev) => ({
      ...prev,
      [param]: parseFloat(value),
    }));
  };

  const handleComputedComponentParamChange = (component, param, value) => {
    setComputedComponentParamInputs((prev) => ({
      ...prev,
      [component]: {
        ...prev[component],
        [param]: parseFloat(value),
      },
    }));
  };

  const handleDownloadComputedParameters = () => {
    const computedData = {
      assetId: assetId,
      computedAssetParameters: computedAssetParamInputs,
      computedComponentParameters: computedComponentParamInputs,
    };

    // Trigger the download of the computedData as a JSON file
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(computedData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${assetId || 'computed_parameters'}.json`);
    document.body.appendChild(downloadAnchorNode); // Required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    // Reset the form
    setAssetId('');
    setComputedAssetParamInputs({});
    setComputedComponentParamInputs({});
  };

  return (
    <div className="p-4 bg-white border rounded mb-4">
      <h2 className="text-xl font-semibold mb-4">Computed Parameters Builder</h2>

      {/* Asset ID Input */}
      <label className="block text-lg font-semibold mb-2">Asset ID</label>
      <input
        type="text"
        placeholder="Enter asset ID"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
      />

      {/* Computed Asset Parameters */}
      <h3 className="text-lg font-semibold mb-2">Computed Asset Parameters</h3>
      {computedAssetParametersList.length === 0 ? (
        <p>No computed asset parameters defined.</p>
      ) : (
        computedAssetParametersList.map((param) => (
          <div key={param} className="mb-2">
            <label className="block text-sm font-medium">{param}</label>
            <input
              type="number"
              placeholder={`Enter value for ${param}`}
              className="w-full p-2 border border-gray-300 rounded"
              value={computedAssetParamInputs[param] || ''}
              onChange={(e) => handleComputedAssetParamChange(param, e.target.value)}
            />
          </div>
        ))
      )}

      {/* Computed Component Parameters */}
      {componentNames.map((component) => (
        <div key={component} className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Computed Parameters for {component}
          </h3>
          {(computedComponentParameters[component] || []).length === 0 ? (
            <p>No computed parameters for {component}.</p>
          ) : (
            computedComponentParameters[component].map((param) => (
              <div key={param} className="mb-2">
                <label className="block text-sm font-medium">{param}</label>
                <input
                  type="number"
                  placeholder={`Enter value for ${component} ${param}`}
                  className="w-full p-2 border border-gray-300 rounded"
                  value={computedComponentParamInputs[component]?.[param] || ''}
                  onChange={(e) =>
                    handleComputedComponentParamChange(component, param, e.target.value)
                  }
                />
              </div>
            ))
          )}
        </div>
      ))}

      {/* Download Button */}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded mt-4"
        onClick={handleDownloadComputedParameters}
      >
        Download Computed Parameters
      </button>
    </div>
  );
}

// BrandBuilder.jsx
import React, { useState } from 'react';

export default function BrandBuilder({
  rawAssetParameters,
  componentNames,
  rawComponentParameters,
}) {
  const [brandId, setBrandId] = useState('');
  const [assetParamInputs, setAssetParamInputs] = useState({});
  const [componentParamInputs, setComponentParamInputs] = useState({});

  const handleAssetParamChange = (param, value) => {
    setAssetParamInputs((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const handleComponentParamChange = (component, param, value) => {
    setComponentParamInputs((prev) => ({
      ...prev,
      [component]: {
        ...prev[component],
        [param]: value,
      },
    }));
  };

  const parseValue = (value) => {
    value = value.trim();

    if (value.includes(',')) {
      const values = value.split(',').map((v) => {
        const num = parseFloat(v.trim());
        return isNaN(num) ? null : num;
      });

      if (values.includes(null)) {
        return null;
      }
      return values;
    } else {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        return num;
      } else {
        return null;
      }
    }
  };

  const handleAddBrand = () => {
    if (brandId) {
      // Parse asset parameters
      const parsedAssetParams = {};
      for (const [param, value] of Object.entries(assetParamInputs)) {
        const parsedValue = parseValue(value);
        if (parsedValue !== null) {
          parsedAssetParams[param] = parsedValue;
        } else {
          alert(`Invalid value for asset parameter "${param}": ${value}`);
          return;
        }
      }

      // Parse component parameters
      const parsedComponentParams = {};
      for (const [component, params] of Object.entries(componentParamInputs)) {
        parsedComponentParams[component] = {};
        for (const [param, value] of Object.entries(params)) {
          const parsedValue = parseValue(value);
          if (parsedValue !== null) {
            parsedComponentParams[component][param] = parsedValue;
          } else {
            alert(`Invalid value for parameter "${param}" in component "${component}": ${value}`);
            return;
          }
        }
      }

      const brandData = {
        brandId: brandId,
        assetParameters: parsedAssetParams,
        componentParameters: parsedComponentParams,
      };

      // Trigger the download of the brandData as a JSON file
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(brandData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', `${brandId}.json`);
      document.body.appendChild(downloadAnchorNode); // Required for Firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();

      // Reset the form
      setBrandId('');
      setAssetParamInputs({});
      setComponentParamInputs({});
    }
  };

  return (
    <div className="p-4 bg-white border rounded mb-4">
      <h2 className="text-xl font-semibold mb-4">Brand Builder</h2>

      {/* Brand ID Input */}
      <label className="block text-lg font-semibold mb-2">Brand ID</label>
      <input
        type="text"
        placeholder="Enter brand ID"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={brandId}
        onChange={(e) => setBrandId(e.target.value)}
      />

      <p className="mb-4 text-sm text-gray-600">
        <strong>Note:</strong> You can enter a single number (e.g., <code>5</code>) or a list of numbers separated by commas (e.g., <code>1, 2, 3</code>).
      </p>

      {/* Asset Parameters */}
      <h3 className="text-lg font-semibold mb-2">Asset Parameters</h3>
      {rawAssetParameters.map((param) => (
        <div key={param} className="mb-2">
          <label className="block text-sm font-medium">{param}</label>
          <input
            type="text"
            placeholder={`Enter value(s) for ${param}`}
            className="w-full p-2 border border-gray-300 rounded"
            value={assetParamInputs[param] || ''}
            onChange={(e) => handleAssetParamChange(param, e.target.value)}
          />
        </div>
      ))}

      {/* Component Parameters */}
      {componentNames.map((component) => (
        <div key={component} className="mt-4">
          <h3 className="text-lg font-semibold mb-2">{component} Parameters</h3>
          {(rawComponentParameters[component] || []).map((param) => (
            <div key={param} className="mb-2">
              <label className="block text-sm font-medium">{param}</label>
              <input
                type="text"
                placeholder={`Enter value(s) for ${component} ${param}`}
                className="w-full p-2 border border-gray-300 rounded"
                value={componentParamInputs[component]?.[param] || ''}
                onChange={(e) =>
                  handleComponentParamChange(component, param, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      ))}

      {/* Add Brand Button */}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded mt-4"
        onClick={handleAddBrand}
      >
        Download Brand
      </button>
    </div>
  );
}

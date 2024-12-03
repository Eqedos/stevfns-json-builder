import React, { useRef } from 'react';

export default function ComputedParametersUploader({ computedParameters, setComputedParameters }) {
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const newComputedParameters = {};

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const uploadedData = JSON.parse(event.target.result);

          if (!uploadedData.assetId) {
            alert(`Invalid format in ${file.name}: Missing "assetId" field.`);
            return;
          }

          const { assetId, ...parameters } = uploadedData;

          if (!assetId || typeof parameters !== 'object') {
            alert(`Invalid data in ${file.name}: Could not process parameters.`);
            return;
          }

          // Add the parsed parameters to the newComputedParameters object
          newComputedParameters[assetId] = parameters;

          // Merge into the state after processing all files
          if (Object.keys(newComputedParameters).length === files.length) {
            setComputedParameters((prev) => ({
              ...prev,
              ...newComputedParameters,
            }));
          }
        } catch (error) {
          alert(`Error parsing ${file.name}: ${error.message}`);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-4">
      <button className="px-4 py-2 bg-purple-500 text-white rounded" onClick={handleClickUpload}>
        Upload Computed Parameters
      </button>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        multiple
      />
    </div>
  );
}

// AssetUploader.jsx
import React, { useRef } from 'react';

export default function AssetUploader({ assets, setAssets }) {
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const files = e.target.files;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const asset = JSON.parse(event.target.result);
          const assetName = asset.assetName;
          if (assetName) {
            setAssets((prev) => ({
              ...prev,
              [assetName]: asset,
            }));
          } else {
            alert('Invalid asset JSON: Missing asset name.');
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
      <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={handleClickUpload}>
        Upload Assets
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

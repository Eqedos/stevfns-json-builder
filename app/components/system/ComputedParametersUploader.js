// ComputedParametersUploader.jsx
import React, { useRef } from 'react';

export default function ComputedParametersUploader({ computedParameters, setComputedParameters }) {
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const files = e.target.files;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const computedParam = JSON.parse(event.target.result);
          setComputedParameters((prev) => ({
            ...prev,
            ...computedParam,
          }));
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

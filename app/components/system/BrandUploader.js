// BrandUploader.jsx
import React, { useRef } from 'react';

export default function BrandUploader({ brands, setBrands }) {
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const files = e.target.files;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const brand = JSON.parse(event.target.result);
          const brandId = brand.brandID || `brand_${Date.now()}`;
          setBrands((prev) => ({
            ...prev,
            [brandId]: brand,
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
      <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleClickUpload}>
        Upload Brands
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

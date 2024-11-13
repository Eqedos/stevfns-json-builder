"use client"
// SystemBuilder.jsx
import React, { useState } from 'react';
import LocationBuilder from './LocationBuilder';
import ComponentUploader from './ComponentUploader';
import BrandUploader from './BrandUploader';
import AssetUploader from './AssetUploader';
import ComputedParametersUploader from './ComputedParametersUploader';
import SystemEntryBuilder from './SystemEntryBuilder';
import SystemJSONDownloader from './SystemJSONDownloader';

export default function SystemBuilder() {
  const [locations, setLocations] = useState({});
  const [components, setComponents] = useState({});
  const [brands, setBrands] = useState({});
  const [assets, setAssets] = useState({});
  const [computedParameters, setComputedParameters] = useState({});
  const [systemEntries, setSystemEntries] = useState([]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">System Builder</h1>

      <LocationBuilder locations={locations} setLocations={setLocations} />

      <ComponentUploader components={components} setComponents={setComponents} />
      
      <BrandUploader brands={brands} setBrands={setBrands} />
      
      <AssetUploader assets={assets} setAssets={setAssets} />

      <ComputedParametersUploader computedParameters={computedParameters} setComputedParameters={setComputedParameters} />

      <SystemEntryBuilder systemEntries={systemEntries} setSystemEntries={setSystemEntries} brands={brands} assets={assets} locations={locations} />

      <SystemJSONDownloader
        locations={locations}
        components={components}
        brands={brands}
        assets={assets}
        computedParameters={computedParameters}
        systemEntries={systemEntries}
      />
    </div>
  );
}

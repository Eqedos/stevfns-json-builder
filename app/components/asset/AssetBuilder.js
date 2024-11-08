// AssetBuilder.jsx
"use client";
import React, { useState } from 'react';
import ComponentUploader from './ComponentUploader';
import RawAssetParameters from './RawAssetParameters';
import ComputedAssetParameters from './ComputedAssetParameters';
import AssetLocationParameters from './AssetLocationParameters';
import FunctionEditor from './FunctionEditor';
import JSONDownloader from './JSONDownloader';
import BrandBuilder from './BrandBuilder';
import ComputedParametersBuilder from './ComputedParametersBuilder';
import CollapsibleSection from './CollapsibleSection'; // Import the new component

export default function AssetBuilder() {
  const [assetName, setAssetName] = useState('');
  const [uploadedComponents, setUploadedComponents] = useState({});
  const [componentParameters, setComponentParameters] = useState({});
  const [componentStateVariables, setComponentStateVariables] = useState({});
  const [rawAssetParameters, setRawAssetParameters] = useState([]);
  const [computedAssetParameters, setComputedAssetParameters] = useState({});
  const [locationParameters, setLocationParameters] = useState({});
  const [costFunction, setCostFunction] = useState(null);
  const [sizeFunction, setSizeFunction] = useState(null);
  const [brands, setBrands] = useState({});

  // Extract component names
  const componentNames = Object.keys(uploadedComponents);

  // Extract parameters and state variables from uploaded components
  const rawComponentParameters = getAllRawComponentParameters(uploadedComponents);
  const computedComponentParameters = getAllComputedComponentParameters(uploadedComponents);
  const stateVariables = getAllStateVariables(uploadedComponents);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Asset Builder</h1>

      {/* Asset Name Input */}
      <CollapsibleSection title="Asset Name" defaultCollapsed={false}>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Asset Name</label>
          <input
            type="text"
            placeholder="Enter asset name"
            className="w-full p-2 border border-gray-300 rounded"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
          />
        </div>
      </CollapsibleSection>

      {/* Component Uploader */}
      <CollapsibleSection title="Component Uploader" defaultCollapsed={true}>
        <ComponentUploader
          uploadedComponents={uploadedComponents}
          setUploadedComponents={setUploadedComponents}
          setComponentParameters={setComponentParameters}
          setComponentStateVariables={setComponentStateVariables}
        />
      </CollapsibleSection>

      {/* Raw Asset Parameters */}
      <CollapsibleSection title="Raw Asset Parameters" defaultCollapsed={true}>
        <RawAssetParameters
          rawAssetParameters={rawAssetParameters}
          setRawAssetParameters={setRawAssetParameters}
        />
      </CollapsibleSection>

      {/* Computed Asset Parameters */}
      <CollapsibleSection title="Computed Asset Parameters" defaultCollapsed={true}>
        <ComputedAssetParameters
          computedAssetParameters={computedAssetParameters}
          setComputedAssetParameters={setComputedAssetParameters}
          rawAssetParameters={rawAssetParameters}
          computedAssetParametersList={Object.keys(computedAssetParameters)}
          rawComponentParameters={rawComponentParameters}
          computedComponentParameters={computedComponentParameters}
          componentNames={componentNames}
          locationParameters={locationParameters}
        />
      </CollapsibleSection>

      {/* Asset Location Parameters */}
      <CollapsibleSection title="Asset Location Parameters" defaultCollapsed={true}>
        <AssetLocationParameters
          locationParameters={locationParameters}
          setLocationParameters={setLocationParameters}
        />
      </CollapsibleSection>

      {/* Cost Function Editor */}
      <CollapsibleSection title="Cost Function Editor" defaultCollapsed={true}>
        <FunctionEditor
          functionName="Cost Function"
          func={costFunction}
          setFunc={setCostFunction}
          rawAssetParameters={rawAssetParameters}
          computedAssetParameters={computedAssetParameters}
          rawComponentParameters={rawComponentParameters}
          computedComponentParameters={computedComponentParameters}
          locationParameters={locationParameters}
          stateVariables={stateVariables}
          componentNames={componentNames}
        />
      </CollapsibleSection>

      {/* Size Function Editor */}
      <CollapsibleSection title="Size Function Editor" defaultCollapsed={true}>
        <FunctionEditor
          functionName="Size Function"
          func={sizeFunction}
          setFunc={setSizeFunction}
          rawAssetParameters={rawAssetParameters}
          computedAssetParameters={computedAssetParameters}
          rawComponentParameters={rawComponentParameters}
          computedComponentParameters={computedComponentParameters}
          locationParameters={locationParameters}
          stateVariables={stateVariables}
          componentNames={componentNames}
        />
      </CollapsibleSection>

      {/* Brand Builder */}
      <CollapsibleSection title="Brand Builder" defaultCollapsed={true}>
        <BrandBuilder
          rawAssetParameters={rawAssetParameters}
          componentNames={componentNames}
          rawComponentParameters={rawComponentParameters}
        />
      </CollapsibleSection>

      {/* Computed Parameters Builder */}
      <CollapsibleSection title="Computed Parameters Builder" defaultCollapsed={true}>
        <ComputedParametersBuilder
          computedAssetParametersList={Object.keys(computedAssetParameters)}
          componentNames={componentNames}
          computedComponentParameters={computedComponentParameters}
        />
      </CollapsibleSection>

      {/* JSON Downloader */}
      <CollapsibleSection title="Download Asset JSON" defaultCollapsed={true}>
        <JSONDownloader
          assetName={assetName}
          componentNames={componentNames}
          rawAssetParameters={rawAssetParameters}
          computedAssetParameters={computedAssetParameters}
          costFunction={costFunction}
          sizeFunction={sizeFunction}
          locationParameters={locationParameters}
          brands={brands}
        />
      </CollapsibleSection>
    </div>
  );
}

// Helper functions to extract parameters and state variables from uploaded components
function getAllRawComponentParameters(uploadedComponents) {
  const params = {};
  for (const [componentName, component] of Object.entries(uploadedComponents)) {
    params[componentName] = component.rawParameters || [];
  }
  return params;
}

function getAllComputedComponentParameters(uploadedComponents) {
  const params = {};
  for (const [componentName, component] of Object.entries(uploadedComponents)) {
    params[componentName] = component.computedParameters
      ? Object.keys(component.computedParameters)
      : [];
  }
  return params;
}

function getAllStateVariables(uploadedComponents) {
  const vars = {};
  for (const [componentName, component] of Object.entries(uploadedComponents)) {
    vars[componentName] = component.stateVariables
      ? Object.keys(component.stateVariables)
      : [];
  }
  return vars;
}

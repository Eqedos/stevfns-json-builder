// ComponentUploader.jsx
import React, { useRef } from 'react';

export default function ComponentUploader({
  uploadedComponents,
  setUploadedComponents,
  setComponentParameters,
  setComponentStateVariables,
}) {
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const files = e.target.files;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const component = JSON.parse(event.target.result);
          const componentName = component.name || component.componentName;
          if (componentName) {
            // Store the component
            setUploadedComponents((prev) => ({
              ...prev,
              [componentName]: component,
            }));

            // Extract rawParameters (array)
            const rawParameters = component.rawParameters || [];

            // Extract computedParameters (object keys)
            const computedParameters = component.computedParameters
              ? Object.keys(component.computedParameters)
              : [];

            // Combine all parameters
            const allParameters = [...rawParameters, ...computedParameters];

            setComponentParameters((prev) => ({
              ...prev,
              [componentName]: allParameters,
            }));

            // Extract state variable names from stateVariables object
            const stateVariables = component.stateVariables
              ? Object.keys(component.stateVariables)
              : [];

            setComponentStateVariables((prev) => ({
              ...prev,
              [componentName]: stateVariables,
            }));
          } else {
            alert('Invalid component JSON: Missing component name.');
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
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleClickUpload}
      >
        Upload Components
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

import React from 'react';

export default function SystemJSONDownloader({
  locations,
  components,
  brands,
  assets,
  computedParameters,
  systemEntries,
}) {
  const generateSystemJSON = () => {
    const systemJSON = {
      locations,
      components,
      brands,
      assets,
      computedParameters,
      system: systemEntries.reduce((acc, entry) => {
        acc[entry.assetID] = {
          assetID: entry.assetID,
          assetName: entry.assetName,
          brandID: entry.brandID,
          startTime: entry.startTime,
          endTime: entry.endTime,
          locations: entry.selectedLocations, // Add mapped locations here
        };
        return acc;
      }, {}),
    };

    const blob = new Blob([JSON.stringify(systemJSON, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'system_config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={generateSystemJSON} className="px-4 py-2 bg-blue-500 text-white rounded mt-4">
      Download System JSON
    </button>
  );
}

export default function JSONDownloader({
  name,
  period,
  stateVariables,
  resourceNodes,
  rawParameters,
  locationParameters,
  computedParameters,
}) {
  const handleGenerateJSON = () => {
    const json = {
      name,
      period: parseInt(period),
      stateVariables: stateVariables.reduce((acc, variable) => {
        acc[variable.name] = { temporal: variable.temporal, name: variable.name, bounds: variable.bounds };
        return acc;
      }, {}),
      resourceNodes: resourceNodes.reduce((acc, node) => {
        acc[node.resourceNodeKey] = {
          resourceName: node.resourceName,
          isPublic: node.isPublic,
          location: node.location,
          isInequality: node.isInequality,
        };
        return acc;
      }, {}),
      rawParameters,
      locationParameters,
      computedParameters,
    };

    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name || 'component'}_config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleGenerateJSON}>
      Generate JSON
    </button>
  );
}

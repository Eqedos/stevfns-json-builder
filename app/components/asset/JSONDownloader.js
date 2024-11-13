// JSONDownloader.jsx
export default function JSONDownloader({
  assetName,
  componentNames,
  rawAssetParameters,
  computedAssetParameters,
  costFunction,
  sizeFunction,
  locationParameters,
}) {
  const handleDownload = () => {
    const data = {
        assetName,
        componentNames,
        rawAssetParameters,
        computedAssetParameters,
        costFunction,
        sizeFunction,
        locationParameters,
    };
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${assetName}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <button
      className="px-4 py-2 bg-purple-500 text-white rounded mt-4"
      onClick={handleDownload}
    >
      Download Asset JSON
    </button>
  );
}

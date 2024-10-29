"use client";
import { useState } from 'react';
import StateVariables from './StateVariables';
import ResourceNodes from './ResourceNodes';
import RawParameters from './RawParameters';
import LocationParameters from './LocationParameters';
import ComputedParameters from './ComputedParameters';
import Edges from './Edges';
import JSONDownloader from './JSONDownloader';

export default function ComponentBuilder() {
  const [name, setName] = useState('');
  const [period, setPeriod] = useState(1);
  const [stateVariables, setStateVariables] = useState([]);
  const [resourceNodes, setResourceNodes] = useState([]);
  const [rawParameters, setRawParameters] = useState([]);
  const [locationParameters, setLocationParameters] = useState({});
  const [computedParameters, setComputedParameters] = useState({});
  const [edges, setEdges] = useState({});

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Component Builder</h1>
      
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <input
        type="number"
        placeholder="Period"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
      />

      <StateVariables stateVariables={stateVariables} setStateVariables={setStateVariables} />
      <ResourceNodes resourceNodes={resourceNodes} setResourceNodes={setResourceNodes} />
      <RawParameters rawParameters={rawParameters} setRawParameters={setRawParameters} />
      <LocationParameters locationParameters={locationParameters} setLocationParameters={setLocationParameters} />
      <ComputedParameters 
        computedParameters={computedParameters} 
        setComputedParameters={setComputedParameters} 
        rawParameters={rawParameters} 
        locationParameters={locationParameters} 
      />
      <Edges
        edges={edges}
        setEdges={setEdges}
        stateVariables={stateVariables}
        resourceNodes={resourceNodes}
        rawParameters={rawParameters}
        locationParameters={locationParameters}
        computedParameters={computedParameters}
      />

      <JSONDownloader
        name={name}
        period={period}
        stateVariables={stateVariables}
        resourceNodes={resourceNodes}
        rawParameters={rawParameters}
        locationParameters={locationParameters}
        computedParameters={computedParameters}
        edges={edges}
      />
    </div>
  );
}

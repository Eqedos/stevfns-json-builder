import StateVariable from './StateVariable';

export default function StateVariables({ stateVariables = [], setStateVariables }) {
  const handleAddStateVariable = () => {
    setStateVariables([...stateVariables, { name: '', temporal: false, bounds: { min: 0, max: 10 }, isExpanded: false }]);
  };

  const handleStateVariableChange = (index, field, value) => {
    const updatedVariables = [...stateVariables];
    updatedVariables[index][field] = field === 'temporal' ? value === 'true' : value;
    setStateVariables(updatedVariables);
  };

  const handleDeleteStateVariable = (index) => {
    setStateVariables(stateVariables.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">State Variables</h2>
      {stateVariables.map((variable, index) => (
        <StateVariable
          key={index}
          index={index}
          variable={variable}
          onChange={handleStateVariableChange}
          onDelete={handleDeleteStateVariable}
        />
      ))}
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAddStateVariable}>
        Add State Variable
      </button>
    </div>
  );
}

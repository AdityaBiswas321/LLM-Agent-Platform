// src/components/ModuleConfig.js
import React from 'react';

function ModuleConfig({ selectedModule }) {
  if (!selectedModule) return <div>Select a module to configure</div>;

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', marginTop: '10px' }}>
      <h3>Configure Module: {selectedModule.data.label}</h3>
      <div>
        <label>System Prompt:</label>
        <input type="text" placeholder="Enter system prompt" />
      </div>
      <div>
        <label>Output Format:</label>
        <select>
          <option value="txt">Text (.txt)</option>
          <option value="csv">CSV (.csv)</option>
        </select>
      </div>
      <button>Save Configuration</button>
    </div>
  );
}

export default ModuleConfig;

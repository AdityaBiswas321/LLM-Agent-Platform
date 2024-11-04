// src/components/EditModuleModal.js
import React, { useState, useEffect } from 'react';

const EditModuleModal = ({ moduleId, name, initialPrompt, initialCommands, onClose, style }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [commands, setCommands] = useState(initialCommands);

  useEffect(() => {
    setCommands(initialCommands);
  }, [initialCommands]);

  const handleSave = () => {
    console.log(`Module ID: ${moduleId}`);
    console.log('Saved Prompt:', prompt);
    console.log('Saved Commands:', commands);
    onClose();
  };

  return (
    <div style={{ ...modalStyles.overlay, ...style }}>
      <div style={modalStyles.modal}>
        <h3>Edit {name}</h3>
        <label>
          System Prompt:
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="3"
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Activation Commands:
          <textarea
            value={commands}
            onChange={(e) => setCommands(e.target.value)}
            rows="3"
            style={{ width: '100%' }}
          />
        </label>
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleSave} style={modalStyles.button}>Save</button>
          <button onClick={onClose} style={modalStyles.button}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  button: {
    marginTop: '10px',
    marginRight: '5px',
    padding: '6px 10px',
    cursor: 'pointer',
  },
};

export default EditModuleModal;

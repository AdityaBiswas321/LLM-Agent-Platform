// src/components/Module.js
import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { FiEdit } from 'react-icons/fi';
import EditModuleModal from './EditModuleModal';

const Module = ({ data, id, onUpdateCommands = () => {} }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show the edit icon when hovering over the module
  const handleMouseEnter = () => setShowEdit(true);
  const handleMouseLeave = () => {
    if (!isModalOpen) setShowEdit(false);
  };

  // Open modal to edit module details
  const openModal = () => {
    setIsModalOpen(true);
    setShowEdit(false);
  };

  // Close modal and hide the edit icon
  const closeModal = () => {
    setIsModalOpen(false);
    setShowEdit(false);
  };

  useEffect(() => {
    if (data.commands) {
      onUpdateCommands(data.commands); // Update parent component when commands change
    }
  }, [data.commands, onUpdateCommands]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          padding: '10px',
          border: '1px solid #b1b1b7',
          borderRadius: '5px',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          width: '150px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          color: '#333',
          cursor: 'pointer',
        }}
      >
        {showEdit && (
          <FiEdit
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              cursor: 'pointer',
              color: '#555',
            }}
          />
        )}

        <Handle
          type="source"
          position={Position.Top}
          id="top"
          style={{ background: '#555', top: '-4px', left: '50%', transform: 'translateX(-50%)' }}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="left"
          style={{ background: '#555', top: '50%', left: '-4px', transform: 'translateY(-50%)' }}
        />
        <div>{data.label}</div>
        <Handle
          type="target"
          position={Position.Bottom}
          id="bottom"
          style={{ background: '#555', bottom: '-4px', left: '50%', transform: 'translateX(-50%)' }}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="right"
          style={{ background: '#555', top: '50%', right: '-4px', transform: 'translateY(-50%)' }}
        />
      </div>

      {isModalOpen && (
        <EditModuleModal
          moduleId={id}
          name={data.label}
          initialPrompt={data.prompt || ''}
          initialCommands={data.commands || ''}
          onClose={closeModal}
          style={{
            position: 'absolute',
            top: '50%',
            left: '120%',
            transform: 'translateY(-50%)',
            zIndex: '1000',
          }}
        />
      )}
    </div>
  );
};

export default Module;

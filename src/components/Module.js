// src/components/Module.js
import React, { useState, useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditModuleModal from "./EditModuleModal";

const Module = ({ data, id, onUpdateCommands = () => {}, onDelete }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => setShowEdit(true);
  const handleMouseLeave = () => {
    if (!isModalOpen) setShowEdit(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setShowEdit(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowEdit(false);
  };

  useEffect(() => {
    if (data.commands) {
      onUpdateCommands(data.commands);
    }
  }, [data.commands, onUpdateCommands]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          padding: "10px",
          border: "1px solid #b1b1b7",
          borderRadius: "5px",
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          width: "150px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          color: "#333",
          cursor: "pointer",
        }}
      >
        {showEdit && (
          <div
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <FiEdit
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
              style={{
                cursor: "pointer",
                color: "#555",
              }}
            />
            <FiTrash2
              onClick={(e) => {
                e.stopPropagation();
                data.onDelete(); // Trigger delete when trash icon is clicked
              }}
              style={{
                cursor: "pointer",
                color: "#d9534f",
              }}
            />
          </div>
        )}

        <Handle
          type="target"
          position={Position.Top}
          id="top"
          className="handle"
          style={{
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="left"
          className="handle"
          style={{
            top: "50%",
            left: "-8px",
            transform: "translateY(-50%)",
          }}
        />
        <div>{data.label}</div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          className="handle"
          style={{
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="right"
          className="handle"
          style={{
            top: "50%",
            right: "-8px",
            transform: "translateY(-50%)",
          }}
        />
      </div>

      {isModalOpen && (
        <EditModuleModal
          moduleId={id}
          name={data.label}
          initialPrompt={data.prompt || ""}
          initialCommands={data.commands || ""}
          onClose={closeModal}
          style={{
            position: "absolute",
            top: "50%",
            left: "120%",
            transform: "translateY(-50%)",
            zIndex: "1000",
          }}
        />
      )}
    </div>
  );
};

export default Module;
